$(function() {
	"use strict";
	var videoPlayer,
		renderer,captionEditor, commandStack, timeline,
		timestamp = document.getElementById("timestamp"),
		automove = document.getElementById("moveAfterAddButton"),
		clearRepeatButton = document.getElementById("clearRepeatButton"),
		enableRepeatButton = document.getElementById("enableRepeatButton"),
		repeatIcon = document.getElementById("repeatIcon");

	function frame_change() { timeline.currentTime = this.currentTime;}
	function setlen(){ timeline.length = videoPlayer.duration; timestamp.textContent = timeline.timeCode; }	
	
	commandStack = new EditorWidgets.CommandStack();
	commandStack.bindKeyEvents(document);

	timeline = new Timeline(document.getElementById("timeline"),{
		stack: commandStack,
		width: document.body.clientWidth || window.innerWidth,
		length: 3600,
		start: 0,
		end: 240,
		multi: true,
		tool: Timeline.SELECT
	});

	captionEditor = CaptionEditor({
		stack: commandStack,
		timeline: timeline
	});
	renderer = new TimedText.CaptionRenderer({
		renderCue: captionEditor.make.bind(captionEditor)
	});
	captionEditor.renderer = renderer;

	Ayamel.prioritizedPlugins.video = ["html5","flash","youtube","brightcove"];
	Ayamel.prioritizedPlugins.audio = ["html5"];
	
	try{
		videoPlayer = new Ayamel.classes.AyamelPlayer({
			$holder: $('#contentHolder'),
			captionRenderer: renderer,
			resource: media_resource,
			captionTracks: transcript_resources,
			components:{
				left: ["play","volume","captions"],
				right:["rate","fullscreen","timeCode"]
			}
		});	

		videoPlayer.addEventListener('loadedmetadata',setlen,false);
		videoPlayer.addEventListener('durationchange',setlen,false);
		videoPlayer.addEventListener("timeupdate",frame_change.bind(videoPlayer),false);
		timeline.on('jump', function(time){ videoPlayer.currentTime = time; });

		// Track selection
		videoPlayer.addEventListener("enabletrack", function(event) {
			if (timeline.hasTextTrack(event.track.label)) { return; }
			timeline.addTextTrack(event.track, event.track.mime);
			updateSpacing();
		});
		/*videoPlayer.addEventListener("disabletrack", function(event) {
			timeline.removeTextTrack(event.track.label);
			updateSpacing();
		});*/
	}catch(e){
		alert(e.message);
	}
	
	timeline.on('convert', function(){ renderer.rebuildCaptions(false); });
	timeline.on('move', function(){ renderer.rebuildCaptions(false); });
	timeline.on('resizer', function(){ renderer.rebuildCaptions(false); });
	timeline.on('resizel', function(){ renderer.rebuildCaptions(false);});
	timeline.on('merge',function(seg) { renderer.rebuildCaptions(true); });
	timeline.on('unmerge',function(seg) { renderer.rebuildCaptions(true); });
	timeline.on('split',function(seg) { renderer.rebuildCaptions(true); });
	timeline.on('timeupdate', function(){ timestamp.textContent = timeline.timeCode; });
	timeline.on('delete',function(seg) {
		if(timeline.spanInView(seg.startTime,seg.endTime)){
			renderer.rebuildCaptions(true);
		}
	});
	timeline.on('create',function(seg) {
		if(automove.classList.contains('active')){
			timeline.currentTool = Timeline.MOVE;
			$("#moveToolButton").button("toggle");
		}
		if(seg.active){
			renderer.rebuildCaptions(false);
		}
	});
	timeline.on('unpaste',function(segs) {
		if(segs.some(function(seg){ return timeline.spanInView(seg.startTime,seg.endTime); })){
			renderer.rebuildCaptions(true);
		}
	});
	timeline.on('paste',function(segs) {
		if(segs.some(function(seg){ return seg.active; })){
			renderer.rebuildCaptions(false);
		}
	});
	timeline.on('abRepeatEnabled',function(){
		enableRepeatButton.title = "Disable Repeat";
		repeatIcon.className = "icon-circle";
	});
	timeline.on('abRepeatDisabled',function(){
		enableRepeatButton.title = "Enable Repeat";
		repeatIcon.className = "icon-circle-blank";
	});
	timeline.on('abRepeatSet',function(){
		[clearRepeatButton, enableRepeatButton].forEach(function(b){ b.classList.remove('disabled'); });
	});
	timeline.on('abRepeatUnset',function(){
		[clearRepeatButton, enableRepeatButton].forEach(function(b){ b.classList.add('disabled'); });
	});
	
	timeline.on('addtrack',function(track){
		if(videoPlayer){ videoPlayer.addTextTrack(track.textTrack); }
		updateSpacing();
	});

	timeline.on('removetrack',function(track){
		updateSpacing();
	});
	
	// Loading a track
	$("#loadTrackButton").click(function() {
		var kind = $("#loadType").val();
		var language = $("#loadLanguage").val();
		var where = $("#loadDestination").val();
		EditorWidgets.LocalFile(where,/.*\.(vtt|srt|ass|ttml)/,function(fileObj){
			TextTrack.parse({
				content: fileObj.data,
				mime: fileObj.mime,
				kind: kind,
				label: fileObj.name,
				lang: language,
				success: function(track, mime) {
					track.mode = "showing";
					timeline.addTextTrack(track, mime, true);
					updateSpacing();
				}
			});
		});
		$("#loadTrackModal").modal("hide");
	});

	// Track buttons
	document.getElementById("createTrackButton").addEventListener("click", function() {
		var $trackName = $("#trackName"),
			type = $("#trackType").val(),
			name = $trackName.val() || "Untitled",
			language = $("#trackLanguage").val(),
			track = new TextTrack(type, name, language),
			mime = $("#trackFormat").val();

		$('#newTrackModal').modal('hide');
		track.mode = "showing";
		track.readyState = TextTrack.LOADED;
		timeline.addTextTrack(track, mime);
		updateSpacing();

		// Clear the form
		$trackName.val("");
	});

	function updateSpacing() {
		$("#bottomSpacer").css("margin-top", $("#bottomContainer").height() + "px");
		$('html,body').animate({scrollTop: document.body.scrollHeight - window.innerHeight}, 1000,'swing');
	}
	
	updateSpacing();

	// Check for unsaved tracks before leaving
	window.addEventListener('beforeunload',function(e){
		if(!commandStack.saved){ return "You Have Unsaved Changes."; }
	}, false);

	window.addEventListener('resize',function(){ timeline.width = window.innerWidth; }, false);

	automove.addEventListener("click", function() {
		if(automove.classList.contains('active')){
			automove.classList.remove("btn-yellow");
			automove.classList.add("btn-inverse");
		} else {
			automove.classList.add("btn-yellow");
			automove.classList.remove("btn-inverse");
		}
	}, false);


	//Bind the toolbar buttons

	// Undo/redo buttons
	document.getElementById("undoButton").addEventListener('click',function(){ commandStack.undo(); },false);
	document.getElementById("redoButton").addEventListener('click',function(){ commandStack.redo(); },false);

	// Tool buttons
	function setTool(tool){	timeline.currentTool = tool; }
	document.getElementById("selectToolButton").addEventListener('click',setTool.bind(null,Timeline.SELECT),false);
	document.getElementById("moveToolButton").addEventListener('click',setTool.bind(null,Timeline.MOVE),false);
	document.getElementById("timeShiftToolButton").addEventListener('click',setTool.bind(null,Timeline.SHIFT),false);
	document.getElementById("addCueToolButton").addEventListener('click',setTool.bind(null,Timeline.CREATE),false);
	document.getElementById("splitToolButton").addEventListener('click',setTool.bind(null,Timeline.SPLIT),false);
	document.getElementById("deleteToolButton").addEventListener('click',setTool.bind(null,Timeline.DELETE),false);
	document.getElementById("scrollToolButton").addEventListener('click',setTool.bind(null,Timeline.SCROLL),false);
	document.getElementById("reorderToolButton").addEventListener('click',setTool.bind(null,Timeline.ORDER),false);
	document.getElementById("repeatToolButton").addEventListener('click',setTool.bind(null,Timeline.REPEAT),false);

	// AB Repeat Controls
	clearRepeatButton.addEventListener('click',function(){ timeline.clearRepeat(); },false);
	enableRepeatButton.addEventListener('click',function(){ timeline.abRepeatOn = !timeline.abRepeatOn; },false);

	$("#editTrackModal").on("show", function() {

		// Update the track select control
		var $editTrack = $("#editTrack").html('<option id="dummyTrackOption">Select a track</option>');
		
		timeline.tracks.forEach(function(track){
			$editTrack.append('<option value="' + track.id + '">' + track.id + '</option>');
		});

		// Hide the other controls
		$("#editControls").hide();
	});

	$("#editTrack").change(function () {
		var track = timeline.getTrack($(this).val());
		$("#dummyTrackOption").remove();

		// Update and show the other controls
		$("#editControls").show();
		$("#editTrackName").val(track.id);
		$("#editTrackType").val(track.kind);
		$("#editTrackLanguage").val(track.language);
	});

	$("#editTrackButton").click(function() {
		timeline.alterTextTrack(
			$("#editTrack").val(),
			$("#editTrackType").val(),
			$("#editTrackLanguage").val(),
			$("#editTrackName").val(),
			true);

		$("#editTrackModal").modal("hide");
		return false;
	});

	// Add save destinations
	(function () {
		var targets = EditorWidgets.Save.targets;
		Object.keys(targets).forEach(function(key){
			$("#saveDestinations").append('<label class="radio">' +
			'<input type="radio" name="saveDestination" value="' + key + '">' + targets[key].label.replace("To ", "") + '</label>');
		});
	}());

	// Saving modal opening
	$("#saveTrackModal").on("show", function () {
		// Populate the track select
		var $tracksToSave = $("#tracksToSave").html("");
		timeline.trackNames.map(function(name){
			$tracksToSave.append('<option value="' + name + '">' + name + '</option>');
		});
	});

	// The saving mechanism
	$("#saveTrackButton").click(function() {
		var tracks = $("#tracksToSave").val(),
			destination = $("input[name=saveDestination]:checked").val(),
			exportedTracks;
		
		$("#saveTrackModal").modal("hide");
		if(!(tracks && tracks.length)) { return; }
		
		exportedTracks = timeline.exportTracks(tracks);
		
		if (destination === "server") {
			// Saving to the server. Provide all the information and data and let it handle everything
			Object.keys(exportedTracks).forEach(function(key) {
				var textTrack = timeline.getTrack(tracks[key]).textTrack;
				var data = new FormData();
				var fObj = exportedTracks[key];
				data.append("mime", fObj.mime);
				data.append("name", fObj.name);
				data.append("data", fObj.data);
				data.append("label", textTrack.label);
				data.append("language", textTrack.language);
				data.append("kind", textTrack.kind);
				$.ajax({
					url: saveURL,
					data: data,
					cache: false,
					contentType: false,
					processData: false,
					type: "post",
					success: function (data) {
						commandStack.setFileSaved(textTrack.label);
						timeline.render();
					}
				});
			});
		} else {

			// Use one of the editor widget saving mechanisms
			EditorWidgets.Save(
				exportedTracks, destination,
				function(){
					[].forEach.call(tracks,function(name){
						commandStack.setFileSaved(name);
					});
					timeline.render();
				},
				function(){ alert("Error Saving; please try again."); }
			);
		}
	});

	// Add load sources
	(function () {
		var sources = EditorWidgets.LocalFile.sources;
		Object.keys(sources).forEach(function(key){
			$("#loadDestinations").append('<label class="radio">' +
			'<input type="radio" name="loadDestination" value="' + key + '">' + sources[key].label + '</label>');
		});
	}());
});

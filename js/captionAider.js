$(function() {
	var videoPlayer,
renderer,captionEditor, cstack, timeline,
timestamp = document.getElementById("timestamp"),
automove = document.getElementById("moveAfterAddButton"),
clearRepeatButton = document.getElementById("clearRepeatButton"),
enableRepeatButton = document.getElementById("enableRepeatButton"),
repeatIcon = document.getElementById("repeatIcon");
cstack = new EditorWidgets.CommandStack();
cstack.bindKeyEvents(document);

timeline = new Timeline(document.getElementById("timeline"),{
	stack:cstack,
	 width: document.body.clientWidth || window.innerWidth,
	 length:3600,
	 start:0,
	 end:240,
	 multi:true,
	 tool:Timeline.SELECT
});

Ayamel.prioritizedPlugins.video = ["html5","flash","youtube","brightcove"];

try{
	videoPlayer = new Ayamel.classes.AyamelPlayer({
		$holder: $('#contentHolder'),
		    resource: null,
		    components:{
			    left: ["play","volume"],
		    right:["rate","fullscreen","timeCode"]
		    }
	});

	renderer = videoPlayer.captionRenderer;

	captionEditor = CaptionEditor({
		stack: cstack,
		      renderer: renderer,
		      timeline: timeline
	});

	renderer.renderCue = captionEditor.make;

	function frame_change() { timeline.currentTime = this.currentTime;}
	function setlen(){ timeline.length = videoPlayer.duration; timestamp.textContent = timeline.timeCode; }
	videoPlayer.addEventListener('loadedmetadata',setlen,false);
	videoPlayer.addEventListener('durationchange',setlen,false);
	videoPlayer.addEventListener("timeupdate",frame_change.bind(videoPlayer),false);
	timeline.on('jump', function(time){ videoPlayer.currentTime = time; });
	timeline.on('convert', function(){ renderer.rebuildCaptions(false); });
	timeline.on('move', function(){ renderer.rebuildCaptions(false); });
	timeline.on('resizer', function(){ renderer.rebuildCaptions(false); });
	timeline.on('resizel', function(){ renderer.rebuildCaptions(false);});
	timeline.on('addtrack',function(track){
		if (timeline.trackIndices[track.textTrack.label] === undefined) {
			videoPlayer.captionRenderer.addTextTrack(track.textTrack);
			videoPlayer.controlBar.addTrack(track.textTrack);
			updateSpacing();
		}
	});

	//timeline.on("cuechange", function(event) {});
	timeline.on('delete',function(seg) {
		"use strict";
		if(timeline.spanInView(seg.startTime,seg.endTime)){
			renderer.rebuildCaptions(true);
		}
	});
	timeline.on('create',function(seg) {
		"use strict";
		if(automove.classList.contains('active')){
			timeline.currentTool = Timeline.MOVE;
			$("#moveToolButton").button("toggle");
		}
		if(seg.active){
			renderer.rebuildCaptions(false);
		}
	});
	timeline.on('unpaste',function(segs) {
		"use strict";
		if(segs.some(function(seg){ return timeline.spanInView(seg.startTime,seg.endTime); })){
			renderer.rebuildCaptions(true);
		}
	});
	timeline.on('paste',function(segs) {
		"use strict";
		if(segs.some(function(seg){ return seg.active; })){
			renderer.rebuildCaptions(false);
		}
	});
	timeline.on('merge',function(seg) {
		"use strict";
		renderer.rebuildCaptions(true);
	});
	timeline.on('unmerge',function(seg) {
		"use strict";
		renderer.rebuildCaptions(true);
	});
	timeline.on('split',function(seg) {
		"use strict";
		renderer.rebuildCaptions(true);
	});
	timeline.on('timeupdate', function(){ timestamp.textContent = timeline.timeCode; });

	// Listen for track creation from drop
	timeline.on('dropTrack', function (track) {
		videoPlayer.captionRenderer.addTextTrack(track);
		videoPlayer.controlBar.addTrack(track);
		updateSpacing();
	});

	// Track selection
	videoPlayer.addEventListener("enabletrack", function(event) {
		if (timeline.trackIndices[event.track.label] === undefined) {
			timeline.addTextTrack(event.track, event.track.mime);
			updateSpacing();
		}
	});
	videoPlayer.addEventListener("disabletrack", function(event) {
		timeline.removeTextTrack(event.track.label);
		updateSpacing();
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
	timeline.addTextTrack(track, mime, true);
}catch(e){
	alert(e.message);
}

function updateSpacing() {
	$("#bottomSpacer").css("margin-top", $("#bottomContainer").height() + "px");
	$('html,body').animate({scrollTop: document.body.scrollHeight - window.innerHeight}, 1000,'swing');

}


updateSpacing();

// Check for unsaved tracks before leaving
window.addEventListener('beforeunload',function(e){
	// To be done
}, false);

window.addEventListener('resize',function(){
	"use strict";
	timeline.width = window.innerWidth;
}, false);

// Set up listeners


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
document.getElementById("undoButton").addEventListener('click',function(){ timeline.cstack.undo(); },false);
document.getElementById("redoButton").addEventListener('click',function(){ timeline.cstack.redo(); },false);

// Font size buttons
document.getElementById('plusFontButton').addEventListener('click',function(){ renderer.fontSizeRatio += 0.005; },false);
document.getElementById('minusFontButton').addEventListener('click',function(){ renderer.fontSizeRatio -= 0.005; },false);

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


// Track buttons
document.getElementById("createTrackButton").addEventListener("click", function() {
	var $trackName = $("#trackName"),
	type = $("#trackType").val(),
	name = $trackName.val() || "Untitled",
	language = $("#trackLanguage").val(),
	track = new TextTrack(type, name, language),
	mime = $("#trackFormat").val();
	track.mode = "showing";
	track.readyState = TextTrack.LOADED;
	$('#newTrackModal').modal('hide');

	// Add the track to the player
	videoPlayer.captionRenderer.addTextTrack(track);
	videoPlayer.controlBar.addTrack(track);
	updateSpacing();

	// Clear the form
	$trackName.val("");
});

$("#editTrackModal").on("show", function() {

	// Update the track select control
	var $editTrack = $("#editTrack").html('<option id="dummyTrackOption">Select a track</option>');
	for (var name in timeline.trackIndices) {
		$editTrack.append('<option value="' + timeline.trackIndices[name] + '">' + name + '</option>');
	}

	// Hide the other controls
	$("#editControls").hide();
});

$("#editTrack").change(function () {
	var track = timeline.tracks[$(this).val()];
	$("#dummyTrackOption").remove();

	// Update and show the other controls
	$("#editControls").show();
	$("#editTrackName").val(track.textTrack.label);
	$("#editTrackType").val(track.textTrack.kind);
	$("#editTrackLanguage").val(track.textTrack.language);
});

$("#editTrackButton").click(function() {
	var track = timeline.tracks[$("#editTrack").val()];
	track.textTrack.kind = $("#editTrackType").val();
	track.textTrack.language = $("#editTrackLanguage").val();

	// Update the label
	var newName = $("#editTrackName").val();
	if (newName !== track.textTrack.label) {
		timeline.trackIndices[newName] = timeline.trackIndices[track.textTrack.label];
		delete timeline.trackIndices[track.textTrack.label];
		track.textTrack.label = newName;
	}

	$("#editTrackModal").modal("hide");
	timeline.render();
	return false;
});

// Add save destinations
(function () {
	var targets = EditorWidgets.Save.targets, key;
	for(key in targets) if(targets.hasOwnProperty(key)){
		$("#saveDestinations").append('<label class="radio">' +
			'<input type="radio" name="saveDestination" value="' + key + '">' + targets[key].label.replace("To ", "") + '</label>');
	}
}());

// Saving modal opening
$("#saveTrackModal").on("show", function () {
	// Populate the track select
	var $tracksToSave = $("#tracksToSave").html("");
	Object.keys(timeline.trackIndices).map(function(name){
		$tracksToSave.append('<option value="' + name + '">' + name + '</option>');
	});
});

// The saving mechanism
$("#saveTrackButton").click(function() {
	var tracks = $("#tracksToSave").val(),
	destination = $("input[name=saveDestination]:checked").val(),
	key, data, textTrack;
if (tracks && tracks.length) {
	var exportedTracks = timeline.exportTracks(tracks);
	if (destination === "ayamel") {

		// Saving to the server. Provide all the information and data and let it handle everything
		for (key in exportedTracks) {
			textTrack = timeline.getTrack(tracks[key]).textTrack;
			data = new FormData();
			data.append("mime", exportedTracks[key].mime);
			data.append("name", exportedTracks[key].name);
			data.append("label", textTrack.label);
			data.append("data", exportedTracks[key].data);
			data.append("language", textTrack.language);
			data.append("kind", textTrack.kind);
			data.append("resourceId", textTrack.resourceId || "");
			data.append("contentId", content.id);
			$.ajax({
				url: "/captionaider/save",
				data: data,
				cache: false,
				contentType: false,
				processData: false,
				type: "post",
				success: function (data) {
					alert("Saved Successfully");
					commandStack.saved = true;
					timeline.render();
				}
			});
		}
	} else {

		// Use one of the editor widget saving mechanisms
		EditorWidgets.Save(
				exportedTracks, destination,
				function(){
					commandStack.saved = true;
					timeline.render();
					alert("Saved Successfully");
				},
				function(){ alert("Error Saving; please try again."); }
				);
	}
}
$("#saveTrackModal").modal("hide");
});

// Add load sources
(function () {
	var sources = EditorWidgets.LocalFile.sources;
	for(key in sources) if(sources.hasOwnProperty(key)){
		$("#loadDestinations").append('<label class="radio">' +
			'<input type="radio" name="loadDestination" value="' + key + '">' + sources[key].label + '</label>');
	}
}());

// Loading a track
$("#loadTrackButton").click(function() {
	var kind = $("#loadType").val();
	var language = $("#loadLanguage").val();
	var where = $("#loadDestination").val();
	EditorWidgets.LocalFile(where,/.*\.(vtt|srt)/,function(fileObj){
		TextTrack.parse({
			content: fileObj.data,
			mime: fileObj.mime,
			kind: kind,
			label: fileObj.name,
			lang: language,
			success: function(track, mime) {
				track.mode = "showing";
				timeline.addTextTrack(track, mime, true);
				videoPlayer.captionRenderer.addTextTrack(track);
				videoPlayer.controlBar.addTrack(track);
				updateSpacing();
			}
		});
	});
	$("#loadTrackModal").modal("hide");
});
});

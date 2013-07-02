<!DOCTYPE html>
<html lang="en">
  <head>

    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" media="screen" href="./bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" media="screen" href="./bootstrap/css/bootstrap-responsive.min.css">
    <link rel="stylesheet" media="screen" href="./css/font-awesome.min.css">
    <link rel="stylesheet" href="{{{subtitle-timeline-editor}}}/timeline.css"/>
    <link rel="stylesheet" href="./css/timeline.css"/>
    <link rel="stylesheet" href="{{{Ayameljs}}}/css/player.css"/>
    <link rel="stylesheet" href="{{{TimedText}}}/css/timed-text.css"/>

    <script src="./js/jquery-2.0.0.min.js" type="text/javascript"></script>
    <script src="./bootstrap/js/bootstrap.min.js" type="text/javascript"></script>

    <script type="text/javascript" src="{{{EditorWidgets}}}/Save.js"></script>
    <script type="text/javascript" src="{{{EditorWidgets}}}/CommandStack.js"></script>
    <script type="text/javascript" src="{{{EditorWidgets}}}/LocalFiles.js"></script>
    <script type="text/javascript" src="{{{subtitle-timeline-editor}}}/Timeline.js"></script>
    <script type="text/javascript" src="{{{subtitle-timeline-editor}}}/Slider.js"></script>
    <script type="text/javascript" src="{{{subtitle-timeline-editor}}}/TimelineSkin.js"></script>
    <script type="text/javascript" src="{{{subtitle-timeline-editor}}}/TimelineView.js"></script>
    <script type="text/javascript" src="{{{subtitle-timeline-editor}}}/TextTrack.js"></script>
    <script type="text/javascript" src="{{{subtitle-timeline-editor}}}/TimelineMenus.js"></script>
    <script type="text/javascript" src="{{{subtitle-timeline-editor}}}/CaptionEditor.js"></script>
    <script type="text/javascript" src="{{{subtitle-timeline-editor}}}/WaveForm.js"></script>
    <script type="text/javascript" src="{{{subtitle-timeline-editor}}}/Resampler.js"></script>
    <script type="text/javascript" src="{{{subtitle-timeline-editor}}}/AudioTrack.js"></script>

    <script type="text/javascript" src="{{{subtitle-timeline-editor}}}/aurora/aurora.js"></script>
    <script type="text/javascript" src="{{{subtitle-timeline-editor}}}/aurora/aac.js"></script>
    <script type="text/javascript" src="{{{subtitle-timeline-editor}}}/aurora/alac.js"></script>
    <script type="text/javascript" src="{{{subtitle-timeline-editor}}}/aurora/flac.js"></script>
    <script type="text/javascript" src="{{{subtitle-timeline-editor}}}/aurora/mp3.js"></script>

    <script language="JavaScript" type="text/javascript" src="http://admin.brightcove.com/js/BrightcoveExperiences.js"></script>

    <script type="text/javascript" src="{{{Ayameljs}}}/js/async.js"></script>
    <script type="text/javascript" src="{{{Ayameljs}}}/js/Resource.js"></script>
    <script type="text/javascript" src="{{{Ayameljs}}}/js/swfobject.js"></script>

    <!-- Caption rendering and timed text -->
    <script type="text/javascript" src="{{{TimedText}}}/js/TimedText.js"></script>
    <script type="text/javascript" src="{{{TimedText}}}/js/CaptionRenderer.js"></script>
    <script type="text/javascript" src="{{{TimedText}}}/js/TextTrack.js"></script>
    <script type="text/javascript" src="{{{TimedText}}}/js/TextTrackCue.js"></script>

    <script type="text/javascript" src="{{{TimedText}}}/js/plugins/WebVTT.js"></script>
    <script type="text/javascript" src="{{{TimedText}}}/js/plugins/SRT.js"></script>
    <script type="text/javascript" src="{{{TimedText}}}/js/plugins/TTML.js"></script>
    <script type="text/javascript" src="{{{TimedText}}}/js/plugins/SSAv4.js"></script>


    <script type="text/javascript" src="{{{Ayameljs}}}/js/Ayamel.js"></script>
    <script type="text/javascript" src="{{{Ayameljs}}}/js/AnimationHandler.js"></script>
    <script type="text/javascript" src="{{{Ayameljs}}}/js/AyamelPlayer.js"></script>
    <script type="text/javascript" src="{{{Ayameljs}}}/js/CaptionTrackLoader.js"></script>
    <script type="text/javascript" src="{{{Ayameljs}}}/js/ControlBar.js"></script>
    <script type="text/javascript" src="{{{Ayameljs}}}/js/FullScreenHandler.js"></script>
    <script type="text/javascript" src="{{{Ayameljs}}}/js/KeyBinder.js"></script>
    <script type="text/javascript" src="{{{Ayameljs}}}/js/LangCodes.js"></script>
    <script type="text/javascript" src="{{{Ayameljs}}}/js/MediaPlayer.js"></script>
    <script type="text/javascript" src="{{{Ayameljs}}}/js/Mobile.js"></script>
    <script type="text/javascript" src="{{{Ayameljs}}}/js/ProgressBar.js"></script>
    <script type="text/javascript" src="{{{Ayameljs}}}/js/controls/CaptionsMenu.js"></script>
    <script type="text/javascript" src="{{{Ayameljs}}}/js/controls/FullScreenButton.js"></script>
    <script type="text/javascript" src="{{{Ayameljs}}}/js/controls/PlayButton.js"></script>
    <script type="text/javascript" src="{{{Ayameljs}}}/js/controls/RateSlider.js"></script>
    <script type="text/javascript" src="{{{Ayameljs}}}/js/controls/SliderBar.js"></script>
    <script type="text/javascript" src="{{{Ayameljs}}}/js/controls/TimeCode.js"></script>
    <script type="text/javascript" src="{{{Ayameljs}}}/js/controls/VolumeSlider.js"></script>
    <script type="text/javascript" src="{{{Ayameljs}}}/js/plugins/brightcove.js"></script>
    <script type="text/javascript" src="{{{Ayameljs}}}/js/plugins/flashVideo.js"></script>
    <script type="text/javascript" src="{{{Ayameljs}}}/js/plugins/html5Video.js"></script>
    <script type="text/javascript" src="{{{Ayameljs}}}/js/plugins/html5Audio.js"></script>
    <script type="text/javascript" src="{{{Ayameljs}}}/js/plugins/youtube.js"></script>
  </head>
  <body>
    <div class="container">
      <div class="mainContent">
        <div class="padded">
          <div id="contentHolder" class="video"></div>
          <div id="bottomSpacer"></div>
        </div>
      </div>
    </div>

    <div id="bottomContainer">
      <div id="toolbarHolder">
        <div class="toolbar">
          <strong>Actions:</strong>
          <div class="btn-group">
            <button class="btn btn-small btn-inverse" id="undoButton" title="Undo"><i class="icon-undo"></i></button>
            <button class="btn btn-small btn-inverse" id="redoButton" title="Redo"><i class="icon-repeat"></i></button>
            <button class="btn btn-small btn-inverse" id="plusFontButton" title="Increase Font Size"><i class="icon-plus-sign"></i> Font</button>
            <button class="btn btn-small btn-inverse" id="minusFontButton" title="Decrease Font Size"><i class="icon-minus-sign"></i> Font</button>
          </div>
        </div>

        <div class="toolbar">
          <strong>Tracks:</strong>
          <div class="btn-group">
            <button class="btn btn-small btn-inverse" id="newTrackButton" title="Create a new track" data-target="#newTrackModal" data-toggle="modal"><i class="icon-file"></i></button>
            <button class="btn btn-small btn-inverse" title="Edit track metadata" data-target="#editTrackModal" data-toggle="modal"><i class="icon-pencil"></i></button>
            <button class="btn btn-small btn-inverse" title="Save tracks" data-target="#saveTrackModal" data-toggle="modal"><i class="icon-save"></i></button>
            <button class="btn btn-small btn-inverse" title="Save tracks" data-target="#loadTrackModal" data-toggle="modal"><i class="icon-folder-open"></i></button>
          </div>
        </div>

        <div class="toolbar">
          <strong>Tools:</strong>
          <div class="btn-group" data-toggle="buttons-radio">
            <button class="btn btn-small btn-inverse active" id="selectToolButton" title="Select Tool"><i class="icon-ok"></i></button>
            <button class="btn btn-small btn-inverse" id="moveToolButton" title="Move Tool"><i class="icon-move"></i></button>
            <button class="btn btn-small btn-inverse" id="timeShiftToolButton" title="Time Shift Tool"><i class="icon-resize-horizontal"></i></button>
            <button class="btn btn-small btn-inverse" id="addCueToolButton" title="Add Cue Tool"><i class="icon-plus"></i></button>
            <button class="btn btn-small btn-inverse" id="splitToolButton" title="Split Tool"><i class="icon-cut"></i></button>
            <button class="btn btn-small btn-inverse" id="deleteToolButton" title="Delete Tool"><i class="icon-trash"></i></button>
            <button class="btn btn-small btn-inverse" id="scrollToolButton" title="Scroll Tool"><i class="icon-ellipsis-horizontal"></i></button>
            <button class="btn btn-small btn-inverse" id="reorderToolButton" title="Reorder Tool"><i class="icon-reorder"></i></button>
            <button class="btn btn-small btn-inverse" id="repeatToolButton" title="Set Repeat Tool"><i class="icon-repeat"></i></button>
          </div>
          <div class="btn-group">
            <button class="btn btn-small btn-inverse disabled" id="enableRepeatButton" title="Enable Repeat" data-toggle="button"><i id="repeatIcon" class="icon-circle-blank"></i></button>
            <button class="btn btn-small btn-inverse disabled" id="clearRepeatButton" title="Clear Repeat"><i class="icon-ban-circle"></i></button>
          </div>
          <button class="btn btn-small btn-inverse" id="moveAfterAddButton" title="Move After Add" data-toggle="button">
            <i class="icon-plus"></i>
            <i class="icon-angle-right"></i>
            <i class="icon-move"></i>
          </button>
        </div>

        <div id="timestamp">0:00:00</div>
      </div>

      <div id="timeline"></div>
    </div>

    <div id="newTrackModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="newTrackModalLabel" aria-hidden="true">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3 id="newTrackModalLabel">Create a new track</h3>
      </div>
      <div class="modal-body">
        <form class="form-horizontal">
          <div class="control-group">
            <label class="control-label" for="trackName">Name</label>
            <div class="controls">
              <input type="text" id="trackName" placeholder="Name">
            </div>
          </div>
          <div class="control-group">
            <label class="control-label" for="trackType">Type</label>
            <div class="controls">
              <select id="trackType">
                <option value="subtitles">Subtitles</option>
                <option value="captions">Captions</option>
              </select>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label" for="trackFormat">Format</label>
            <div class="controls">
              <select id="trackFormat">
                <option value="text/vtt" selected="selected">WebVTT</option>
                <option value="text/srt">SubRip</option>
                <option value="application/ttml+xml">TTML</option>
                <option value="text/x-ssa">Sub Station Alpha</option>
              </select>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label" for="trackLanguage">Language</label>
            <div class="controls">
              <select name="trackLanguage" id="trackLanguage"></select>
              <script type="text/javascript">
                (function () {
                  var $select = $("#trackLanguage");
                  Object.keys(Ayamel.utils.p1map).forEach(function (p1) {
                    var code = Ayamel.utils.p1map[p1];
                    var name = Ayamel.utils.getLangName(code);
                    $select.append("<option value='" + code + "'>" + name + "</option>");
                  });
                }());
              </script>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
        <button class="btn btn-blue" id="createTrackButton">Create</button>
      </div>
    </div>
    <div id="editTrackModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="editTrackModalLabel" aria-hidden="true">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3 id="editTrackModalLabel">Edit tracks</h3>
      </div>
      <div class="modal-body">
        <form class="form-horizontal">
          <div class="control-group">
            <label class="control-label" for="editTrack">Which Track</label>
            <div class="controls">
              <select id="editTrack"></select>
            </div>
          </div>
          <div id="editControls">
            <div class="control-group">
              <label class="control-label" for="editTrackName">Name</label>
              <div class="controls">
                <input type="text" id="editTrackName" placeholder="Name">
              </div>
            </div>
            <div class="control-group">
              <label class="control-label" for="editTrackType">Type</label>
              <div class="controls">
                <select id="editTrackType">
                  <option value="subtitles">Subtitles</option>
                  <option value="captions">Captions</option>
                </select>
              </div>
            </div>
            <div class="control-group">
              <label class="control-label" for="editTrackLanguage">Language</label>
              <div class="controls">
                <select name="editTrackLanguage" id="editTrackLanguage" ></select>
                <script type="text/javascript">
                  (function () {
                    var $select = $("#editTrackLanguage");
                    Object.keys(Ayamel.utils.p1map).forEach(function (p1) {
                      var code = Ayamel.utils.p1map[p1];
                      var name = Ayamel.utils.getLangName(code);
                      $select.append("<option value='" + code + "'>" + name + "</option>");
                    });
                  }());
                </script>
              </div>
            </div>
            <div class="control-group">
              <div class="controls">
                <button class="btn btn-blue" id="editTrackButton">Save</button>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
      </div>
    </div>

    <div id="saveTrackModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="saveTrackModalLabel" aria-hidden="true">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3 id="saveTrackModalLabel">Save tracks</h3>
      </div>
      <div class="modal-body">
        <form class="form-horizontal">
          <div class="control-group">
            <label class="control-label" for="tracksToSave">Which Tracks</label>
            <div class="controls">
              <select id="tracksToSave" multiple="multiple"></select>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label">Destination</label>
            <div class="controls">
              <div id="saveDestinations">
                <label class="radio">
                  <input type="radio" name="saveDestination" value="server" checked>
                  Server
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
        <button class="btn btn-blue" id="saveTrackButton">Save</button>
      </div>
    </div>

    <div id="loadTrackModal" class="modal hide fade" tabindex="-1" role="dialog" aria-labelledby="loadTrackModalLabel" aria-hidden="true">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
        <h3 id="saveTrackModalLabel">Load track</h3>
      </div>
      <div class="modal-body">
        <form class="form-horizontal">
          <div class="control-group">
            <label class="control-label" for="loadType">Type</label>
            <div class="controls">
              <select id="loadType">
                <option value="subtitles">Subtitles</option>
                <option value="captions">Captions</option>
              </select>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label" for="loadLanguage">Language</label>
            <div class="controls">
              <select name="loadLanguage" id="loadLanguage" ></select>
              <script type="text/javascript">
                (function () {
                  var $select = $("#loadLanguage");
                  Object.keys(Ayamel.utils.p1map).forEach(function (p1) {
                    var code = Ayamel.utils.p1map[p1];
                    var name = Ayamel.utils.getLangName(code);
                    $select.append("<option value='" + code + "'>" + name + "</option>");
                  });
                }());
              </script>
            </div>
          </div>
          <div class="control-group">
            <label class="control-label">Source</label>
            <div class="controls">
              <div id="loadDestinations">
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button class="btn" data-dismiss="modal" aria-hidden="true">Close</button>
        <button class="btn btn-blue" id="loadTrackButton">Load</button>
      </div>
    </div>
    <script type="text/javascript">
		//Fill in with real data
		var media_resource = {};
		var transcript_resources = [];
		var saveURL = "./save";
    </script>
    <script type="text/javascript" src="./js/captionAider.js"></script>
  </body>
</html>

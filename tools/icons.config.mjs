// Single source of truth for every icon the site can use.
// Edit these lists and run `npm run build:icons` to regenerate:
//   assets/icons/silk.png   (sprite of colored 16x16 "object" icons)
//   css/icons.css           (.i-<name> classes for the sprite)
//   index.html              (inline <symbol> sprite between the glyphs markers)

// Silk icons (famfamfam, CC BY 2.5) — colored 16x16 pixel art, XP-era look.
// Names use the original file names; CSS classes replace "_" by "-".
export const silk = `
folder folder_star folder_page folder_explore folder_user folder_heart folder_lightbulb
page_white_text page_white_acrobat page_white_code page_white_cplusplus page_white_csharp
page_white_copy page_white_world page_white_star page_white_edit page_white_picture page_white_zip page_white_gear page_white_medal
vcard report_user book book_open script
controller joystick cog wrench briefcase bricks brick lightning chart_bar chart_line
medal_gold_1 medal_gold_2 medal_gold_3 award_star_gold_1 award_star_gold_2 award_star_silver_1 award_star_bronze_1 rosette cup star
user user_suit user_gray user_green group
email email_open email_attach world world_go world_link map house computer monitor television
application_double application_xp application_xp_terminal application_view_tile application_view_list application_view_icons application_view_detail application_form
lightbulb bug palette paintbrush cd music sound sound_mute sound_low sound_none link key lock magnifier printer disk door_in door_out
arrow_left arrow_right arrow_up arrow_down arrow_refresh arrow_switch
bin_empty bin bell flag_green flag_red flag_blue flag_yellow heart tag_blue accept cancel error exclamation help information tick
calendar clock time date database package html css layout layers vector pencil photo photos image images film camera webcam phone telephone tux rss
new note page_paste zoom_in zoom_out eye sitemap table font transmit shield wand plugin cursor mouse keyboard thumb_up bomb
emoticon_smile emoticon_wink emoticon_evilgrin emoticon_happy weather_sun server report status_online status_away status_busy status_offline
color_swatch color_wheel wrench_orange
`.split(/\s+/).filter(Boolean);

// pixelarticons (MIT) — monochrome 24x24 grid glyphs, painted with currentColor.
export const glyphs = `
close minus expand collapse plus check check-double
chevron-down chevron-up chevron-left chevron-right arrow-left arrow-right arrow-up arrow-down
search menu more-horizontal more-vertical
volume volume-1 volume-2 volume-3 volume-x wifi languages
calendar clock user users mail phone external-link link copy download upload printer save reload refresh home
folder open file file-text article square grid-3x3 grid-2x2-2 bulletlist list-box filter sliders sliders-horizontal settings-cog gear
info-box circle-info circle-question warning-diamond power power-off login logout
trophy star heart flag target zap fire sparkles lightbulb map globe code terminal cpu gamepad joystick sword skull
briefcase university teach script book-open github linkedin youtube send clipboard play pause stop forward repeat
git-branch bug tools wand brush colors-swatch layout monitor laptop tv projector robot memory-stick database server cloud package box
hash braces binary algorithm moon sun drag-and-drop switch human mug coffee trash delete eye image images camera music headphone video
keyboard mouse pointer zoom-in zoom-out hourglass loader spinner chart analytics tournament crown diamond-gem shield lock unlock key bell
message comment inbox bookmark label tab sort-vertical sort-horizontal tree-pine dog snail leaf feather alien
`.split(/\s+/).filter(Boolean);

// Brand marks (Simple Icons, CC0) — rasterised to a 24x24 grid and re-emitted as
// pixel-perfect paths so they match the pixelarticons set. id -> simple-icons slug.
export const brands = {
  godot: 'godotengine',
  unity: 'unity',
  itch: 'itchdotio',
  steam: 'steam',
  python: 'python',
  cpp: 'cplusplus',
  html5: 'html5',
  git: 'git',
  jira: 'jira',
  oculus: 'oculus',
  js: 'javascript',
  ytmusic: 'youtubemusic',
};

// Hand-drawn 16x16 icons (same look as Silk: 1px dark outline + soft shading).
// "." is transparent. Every row must have exactly 16 characters.
export const custom = [
  {
    name: 'skull',
    palette: { K: '#4a2f2f', W: '#f4efe2', L: '#ffffff', S: '#cdc3ac', R: '#e03a2e' },
    rows: [
      '................',
      '....KKKKKKKK....',
      '..KKWWWWWWWWKK..',
      '.KWWLLWWWWWWWSK.',
      '.KWLWWWWWWWWWSK.',
      'KWWLWWWWWWWWWWSK',
      'KWWWWWWWWWWWWWSK',
      'KWWKKKKWWKKKKWSK',
      'KWKKRKKWWKKRKKSK',
      'KWKKKKKWWKKKKKSK',
      '.KWKKKKWWKKKKSK.',
      '..KWWKWWWWKWWK..',
      '..KKWWWKKWWWKK..',
      '...KWWKWWKWWK...',
      '...KWKWKKWKWK...',
      '....KKKKKKKK....',
    ],
  },
];

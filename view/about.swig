{# no-param #}
{%- extends "template.swig" -%}

{%- block head -%}
<meta name="description" content="About Jiewei Qian, used ID includes: wacky6, std::weak" />
<meta name="keywords" content="Jiewei Qian, wacky6, std::weak, about, contact, who" />
<title>About me</title>
<link rel="stylesheet" href="/about/about.css">
<script src="/inject-height.js"></script>
<script src="/transition-animation.js"></script>
<script src="/about/about.js"></script>
<noscript>
  <style>
    div.g_dtl {height: auto;}
  </style>
</noscript>
{%- endblock -%}
{%- block body -%}
<article>
<header>
<h1>About Me</h1>
</header>
<section class="bio">
<h3>Simple Facts</h3>
<pre>
1995.4 born <strong style="color:#84dcff">@Aries</strong>, now a college student
Sometime <strong style="color:#dd94ff">{Perfectionist, Paranoid}</strong>
<strong style="color:#71ff96">Gadget Lover</strong>
Ocassionally shoot photos, <strong style="color:#05c0ff">PS addictive</strong>
<strong style="color:#ffd605">Single</strong>, and <strong style="color:#ff261c">can't</strong> find girlfirends
<strong style="color:#39ffb7">Game</strong>, <strong style="color:#f4b8ff">Anime</strong>, <strong style="color:#88acff">Technology</strong> (Partial OTAKU)
Born & grow up in <strong>Nanjing, China</strong>
</pre>
</section>
<section class="edu" id="sec_edu">
<h3>Education & Experience</h3>

{% macro overlay(bot, top) -%}
<div class="overlay">
  <h4 class="bot">{{bot}}</h4>
  <h4 class="top">{{top}}</h4>
</div>
{%- endmacro -%}
{% macro bgimg(url -%}
<div class="bg" style="background-image: url('{{url}}');" > </div>
{%- endmacro -%}

<div class="g_dtl" tabindex="0">
{{ bgimg("/about/edu3.jpg") -}}
{{ overlay("University", "Nanjing University of Post and Telecommunication") -}}
<pre>
Entered NJUPT @ 2013, partially a College-Entrance-Exam failure
Computer & Software College, Software Engineering
Member of <a href="http://www.nuptsacc.com">NUPTSACC</a>
PM of a STITP project, 'Smart Home Middleware'

Get tired of Microsoft Windows, purchased a Mac 
Get tired of Android, partially due to blocked Google & rouge Android App Markets in China
Published album 'Love in NSFZ(abbr. of my high school)' on Internet, well accepted by alumni. 
Begin to enjoy more Anime!
    Naruto Series, Fate Stay Night / Fate Zero, Sword Art Online, [and counting...]
</pre>
</div>

<div class="g_dtl" tabindex="1">
{{ bgimg("/about/edu4.jpg") -}}
{{ overlay("As Exchange Student", "Nanjing University, 2014-2015 1st Semester") -}}
<pre>
<strong style="color:#55ff41;">A splendid journey.</strong>
Participated in exchange student program, Software Institute, Nanjing University 
Learned more about SE, team cooperation experience, some projects
    team: sales managing system, Java, SE Course
    team: Web Spider (robot), node.js, Data Structure Course, off-class project
          finds out which webpage is most reached in nju.edu.cn
    solo: Online Dictionary, Java, Java Course
During this time:
    Played with HTML+node.js, Git.
    Delpoyed SVN on Gentoo-ARM for team development.
    Begin to use Linux(Fedora) as desktop environment.
</pre>
</div>

<div class="g_dtl" tabindex="2">
{{ bgimg("/about/edu2.jpg") -}}
{{ overlay("High School", "High School Affiliated to Nanjing Normal University") -}}
<pre>
<strong style="color:#fffc00;">Most Wonderful and Amazing 3 Years as a Student. Best of All time.</strong>
Become more engaged in Coding.
Self-taught C/C++, wrote some nasty programs under windows:
    remote control      <strong class="reality">(read: Torjan)</strong>
    thumbdrive scraper  <strong class="reality">(read: file stoler)</strong>
    remote monitor      <strong class="reality">(read: hentai)</strong>
Get tired of Microsoft VS, begin to use MinGW/gcc
Member of 'NO AUTO Photography Association':
    play cameras with little buddies (lots of fun)
    take snapshots <strong class="reality">(blacken little buddies)</strong> during events
    Canon Photography Contest, China, 2013, Professional Group, Honorable Mention
    several photos archived in High School Graduation Memorial
Meet bilibili, begin to enjoy kichiku videos
Grow into a healthy person, thanks to Chinese teachers at school
Troubleshoot/fix many computer related issues for classmates & teachers
</pre>
</div>

<div class="g_dtl" tabindex="3">
{{ bgimg("/about/edu1.jpg") -}}
{{ overlay("Secondary School", "Nanjing Shuren International School") -}}
<pre>
Originally a private school, turned public in 2013. 
Official name now is: High School Affiliated to Nanjing Normal University Shuren Campus.
This is where I first learn to code. (Pascal)
Self-taught Delphi, Lazarus
<strong>      -- the beginning of everything I am today.</strong>
</pre>
</div>

</section>
<section class="site">
<h3>About this site</h3>
<pre class="quote">You are reading this site thanks to many <strong>open-source</strong> projects</pre>
{%- macro href_icon(title, href, iconUrl) -%}
<a href="{{href}}" style="background-image: url('{{iconUrl}}');">
{%- if title -%}
<span>{{title}}</span>
{%- endif -%}
</a>
{%- endmacro -%}
<div class="float-container">
{{ href_icon("io.js", "https://iojs.org/",
  "https://iojs.org/images/1.0.0.png" ) }}
{{- href_icon("Linux", "http://en.wikipedia.org/wiki/Linux",  
  "http://upload.wikimedia.org/wikipedia/commons/1/1c/Crystal_128_penguin.png" ) }}
{{- href_icon("git",   "http://www.git-scm.com/", 
  "http://git-scm.com/images/logo.png" ) }}
{{- href_icon("vanilla.js", "http://vanilla-js.com",
  "http://vanilla-js.com/assets/vanillin-chemstruct.png") }}
{{- href_icon("", "https://developer.mozilla.org/",
  "https://mdn.mozillademos.org/files/7093/MDN_promoBanner_120x120px.png") }}
</div>
</section>
<section class="etc">
<h3>Et cetera</h3>
<p class="monospace">
Contents (JavaScript, Image, Text) of this website can be used under 
<a href="https://creativecommons.org/licenses/by-nc-sa/4.0/"><strong>CC BY-NC-SA 4.0</strong></a> 
(Unless stated otherwise)
</p>
</section>
</article>
{%- endblock -%}

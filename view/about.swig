{# no-param #}
{%- extends "template.swig" -%}

{%- block head -%}
<title>About me</title>
<link rel="stylesheet" href="/about/about.css">
<script src="/inject-height.js"></script>
<script src="/transition-animation.js"></script>
<script src="/about/about.js"></script>
<noscript>
  <style>
    div.grp_detail {height: auto;}
  </style>
</noscript>
{%- endblock -%}
{%- block body -%}
<article>
<h1>About Me</h1>
<section class="bio">
<h3>Simple Facts</h3>
<pre>
1995.4 born <strong style="color:#84dcff">@Aries</strong>
College student
Sometime <strong style="color:#dd94ff">{Perfectionist, Paranoid}</strong>
<strong style="color:#71ff96">Gadget Lover</strong>
Ocassionally shoot photos, <strong style="color:#05c0ff">PS addictive</strong>
<strong style="color:#ffd605">Single</strong>, and <strong style="color:#ff261c">can't</strong> find girlfirends
<strong style="color:#39ffb7">Game</strong>, <strong style="color:#f4b8ff">Anime</strong>, !Comie, <strong style="color:#88acff">Technology</strong> (Partial OTAKU)
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

<div class="grp_detail" tabindex="0" style="background-image: url('/about/edu3.jpg')">
{{ overlay("University", "Nanjing University of Post and Telecommunication") -}}
<pre>
Entered NJUPT @ 2013, partially due to College-Entrance-Exam failure
Member of <a href="http://www.nuptsacc.com">NUPTSACC</a>
PM of a STITP project
</pre>
</div>

<div class="grp_detail" tabindex="1" style="background-image: url('/about/edu4.jpg')">
{{ overlay("Exchange Student", "Nanjing University, 2014-2015 1st Semester") -}}
<pre>
Participated in an exchange student program, in Software Institute, Nanjing University 
Learned more about SE, complete one SE team project.  
Wrote a simple yet fast spider in node.js: 
    team project: finds out which webpage is most reached in nju.edu.cn
    for fun:      visualize website connection for nju & njupt domain
</pre>
</div>

<div class="grp_detail" tabindex="2" style="background-image: url('/about/edu2.jpg')">
{{ overlay("High School", "High School Affiliated to Nanjing Normal University") -}}
</div>

<div class="grp_detail" tabindex="3" style="background-image: url('/about/edu1.jpg')">
{{ overlay("Secondary School", "Nanjing Shuren International School") -}}
<pre>
</pre>
</div>

</section>
<section class="site">
<h3>About this site</h3>
<h4>What power this site?</h4>
<div class="float-container"></div>
</section>
<section class="etc">
<h3>Et cetera</h3>
</section>
</article>
{%- endblock -%}

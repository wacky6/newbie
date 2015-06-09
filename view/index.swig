{# no-param #}
{%- extends "template.swig" -%}

{%- block head -%}
<title>Aries @ std-aries</title>
<link rel="stylesheet" href="/index/index.css">
<script src="/inject-height.js"></script>
<script src="/transition-animation.js"></script>
<script src="/index/index.js"></script>
<noscript>
<style> img#bg {opacity:1!important;}</style>
</noscript>
{% endblock -%}

{%- block body -%}
<div id="menu_wrap" class="menu tcenter">
<h1 class="edged">Hey!<br />jwQ is here.</h1>
<nav><ul>
{% macro nav_ent(text, href, desc) -%}
<li><a title="{{desc}}" href="{{href}}">{{text}}</a></li>
{%- endmacro -%}
{{- nav_ent("Blog", "blog.std-aries.xyz", "Hexo Blog") -}}
{{- nav_ent("PNS",  "https://wacky6.vicp.cc:27140", "Personal Network Storage") -}}
{{- nav_ent("Play Healthy", "/play-healthy", "How to Play Healthy with Computers") -}}
{{- nav_ent("About", "/about", "About Me, About this Site") -}}
</ul></nav>
</div>
<img id="bg" class="bg tcenter" src="/index/bg1.jpg"></img>
{%- endblock -%}

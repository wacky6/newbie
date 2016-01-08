{# static, index.html #}
{%- extends "template.swig" -%}

{%- block meta %}
<meta name="description" content="Jiewei Qian: college student. Tech-savvy, Anime Game Otaku; Infant Developer;">
<meta name="keywords" content="Jiewei Qian, wacky6, homepage, 主页">
<title>Jiewei Qian: Tech-savvy, Anime &amp; Game Otaku</title>
{% endblock -%}

{%- block head %}
<link rel="stylesheet" href="/index/index.css">
<script src="/index/index.js"></script>
<noscript>
    <style> img#bg {opacity:1!important;} </style>
</noscript>
{% endblock -%}

{%- block nav -%}
{%- endblock %}

{%- block body -%}
<div id="menu_wrap" class="menu fadein">
<header>
<h1 class="edged">Hey!<br />Jw.Q is here.</h1>
</header>
<nav>
{% macro nav_ent(text, href, desc) -%}
<a title="{{desc}}" href="{{href}}">{{text}}</a>
{%- endmacro -%}
{{- nav_ent("Blog", "/Blog/", "QJW's Blog") -}}
{{- nav_ent("Gallery", "http://gallery.std-aries.xyz", "Gallery @ Lofter") -}}
{{- nav_ent("About", "/About/", "About Me, About this Site") -}}
</nav>
</div>
<img id="bg" class="bg tcenter" alt="Silhouette of myself. Shot by my friend." src="/index/bg1.jpg"></img>
{%- endblock -%}

<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, user-scalable=no">
<meta name="author" content="{{author|default('Jiewei Qian, wacky6')}}">
{%- block meta -%}
{%- endblock %}
<meta name="HandheldFriendly" content="true">
<link rel="stylesheet" href="/base.css">
<script src="/bliss.min.js"></script>
<script src="/common.js"></script>
<link rel="icon" href="/favicon.png">
<link rel="stylesheet" href="/font-icons.css">
{% block head  -%}
{%- endblock %}
</head>
<body>
{% block nav -%}
  {%- include "nav.swig" -%}
  <div class="menu-hint">
      <i class="icon-menu"></i>
  </div>
  <div class="banner">
      <div class="placeholder"></div>
      <span>{{banner|default("Jw.Q")}}</span>
  </div>
{%- endblock -%}
<div id="content_wrapper">
{% block body -%}
{%- endblock -%}
</div>
<footer class="copyright">
  <a href="https://github.com/wacky6">jwQ, (C) 2014-2016, CC BY-NC-SA-4.0</a>
</footer>
{%- if google_analytics %}
<!-- Google Analytics -->
<script>
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', 'UA-72435418-1', 'auto');
ga('send', 'pageview');
</script>
<script async src='//www.google-analytics.com/analytics.js'></script>
<!-- End Google Analytics -->
{% endif -%}
</body>
</html>

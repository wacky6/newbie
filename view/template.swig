<!DOCTYPE html>
<html>
<head>
{% include "common-meta.tmpl" %}
{%- block meta -%}
{%- endblock %}

{% include "common-head.tmpl" %}
{% block head -%}
{%- endblock %}
</head>


<body>
{% block nav -%}

{%- include "nav.tmpl" -%}
<div class="menu-hint icon-menu" role="button"></div>
<div class="banner" role="banner">
    <div class="placeholder"></div>
    <span>{{banner|default("Jw.Q")}}</span>
</div>
{%- endblock -%}

{% block overlay -%}
{%- endblock %}

<div id="content_wrapper">
{% block body -%}
{%- endblock -%}
</div>
{% include "copyright-footer.tmpl" %}
{% include "google-analytics.tmpl" %}

</body>


</html>

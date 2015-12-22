{%- extends "template.swig" -%}

{%- block meta %}
{% if norobot -%}
<meta name="robots" content="noindex, nofollow">
{%- endif -%}
<meta name="description" content="{{description|safe}}">
<meta name="keywords" content="{{keywords|join(', ')|safe}}">
<title>{{title}} @ std-aries</title>
{% endblock -%}

{%- block head %}
<link rel="stylesheet" href="/article.css">
<link rel="stylesheet" href="/hljs-css/railscasts.css">
{%- for _ in articleCss%}
    <style> /* Article Embedded */
        {{_|safe}}
    </style>
{% endfor %}
{% endblock -%}

{%- block body -%}
{%- include "nav.swig" %}
<article>
{{ article|safe }}
</article>
{% endblock －%}

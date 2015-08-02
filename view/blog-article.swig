{%- extends "template.swig" -%}

{%- block meta %}
<meta name="description" content="{{description|safe}}" />
<meta name="keywords" content="{{keywords|join(', ')|safe}}" />
<title>{{title}} @ std-aries</title>
{% endblock -%}

{%- block head %}
<link rel="stylesheet" href="/article.css">
<link rel="stylesheet" href="/hljs-css/railcasts.css">
{% endblock -%}

{%- block body -%}
{%- include "nav.swig" %}
<article>
{{ article|safe }}
</article>
{% endblock －%}

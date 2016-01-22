{%- extends "template.swig" -%}

{%- block meta %}
{% if !robots -%}
<meta name="robots" content="noindex, nofollow">
{%- endif -%}
<meta name="description" content="{{description|safe}}">
<meta name="keywords" content="{{keywords|join(', ')|safe}}">
<title>{{title}} | Jw.Q</title>
{% endblock -%}

{%- block head %}
<link rel="stylesheet" href="/article.css">
<link rel="stylesheet" href="/hljs-css/railscasts.css">
{%- for _ in bubbles%}
<!--Embedded-->
{{_|safe}}
{% endfor %}
{% endblock -%}

{%- block body -%}
<article>
{{ html|safe }}
</article>
{% endblock －%}

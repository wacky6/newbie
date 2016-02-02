{%- extends "template.swig" -%}

{%- block meta %}
<meta name="description" content="List of qjw's blog posts">
<meta name="keywords" content="blog, Jiewei Qian, wacky6">
<title>Blogs | Jw.Q</title>
{% endblock -%}

{%- block head %}
<link rel="stylesheet" href="/article.css">
<link rel="stylesheet" href="blog-index.css">
{% endblock -%}

{%- macro articleEntry(m) %}
<li class="post-entry" itemscope itemid="{{m.name}}/" itemtype="http://schema.org/Blog">
  <a href="{{m.name}}/" title="{{m.title}}" {%- if !m.robots -%} nofollow {%- endif %}>
    <div class="title-line">
        <h2 itemprop="headline">{{m.title}}</h2>
        <time class="ctime" itemprop="dateCreated" datetime="{{m.ctime.toISOString()}}">{{m.ctimeStr}}</time>
    </div>
    <meta class="tag" content="{{m.tags}}" />
    <meta class="mtime" itemprop="dateModified" content="{{m.mtime.toISOString()}}" />
    <div class="brief" itemprop="description">{{m.briefHTML|safe}}</div>
  </a>
</li>
{% endmacro -%}

{%- block body -%}
<article>
<header>
	<h1>Blog Posts</h1>
</header>
<ul class='post-list'>
{%- for $ in articles -%}
	{{- articleEntry($) -}}
{% endfor %}
</ul>
</article>

<div class="menu">

</div>
{% endblock -%}

{# nav bar for normal page #}

<nav class="side left" role="navigation">
    <div class="valign">
        <a class="icon-home"    title="Homepage" rel="index" href="/">Index</a>
        <a class="icon-th-list" title="Blog posts" href="/Blog/">Blog</a>
        <a class="icon-user"    title="About me"   href="/About/">About</a>
        {%- block nav_btn %}
        {%- endblock %}
    </div>
</nav>

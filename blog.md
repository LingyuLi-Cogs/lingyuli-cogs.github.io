---
layout: page
title: Blog
permalink: /blog/
---

<ul>
  {% for post in site.posts %}
    <li>
      <h4>
        <a href="{{ post.url | relative_url }}">
          {{ post.title }}
        </a>
      </h4>
      {% if post.tldr %}
        <p>{{ post.tldr }}</p>
      {% else %}
        <p>{{ post.excerpt | strip_html | truncate: 160 }}</p>
      {% endif %}
    </li>
  {% endfor %}
</ul>
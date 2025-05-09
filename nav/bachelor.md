---
layout: cards
title: Bachelor
permalink: /bachelor/
---

<div class="card-grid">
  {% for course in site.data.courses %}
    <!-- <a href="{{ course.url }}"> -->
    <a href="{{ course.url }}" class="card-link"><div class="card">
      <div class="card-title">{{ course.name }}</div>
      <div class="card-divider"></div>
      <p class="card-body">{{ course.description }}</p>
    </div></a>
      <!-- </a> -->
  {% endfor %}
</div>

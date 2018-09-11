document.addEventListener('DOMContentLoaded', function() {
	
	var header = document.querySelector('#header'),
		header__has_top_right_links = document.querySelector('#header .has-top-right-links');
	header__has_top_right_links.innerHTML = header__has_top_right_links.innerHTML + '<a href="#" class="menu-burger"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 24 24"><g><path d="M24,3c0-0.6-0.4-1-1-1H1C0.4,2,0,2.4,0,3v2c0,0.6,0.4,1,1,1h22c0.6,0,1-0.4,1-1V3z"/><path d="M24,11c0-0.6-0.4-1-1-1H1c-0.6,0-1,0.4-1,1v2c0,0.6,0.4,1,1,1h22c0.6,0,1-0.4,1-1V11z"/><path d="M24,19c0-0.6-0.4-1-1-1H1c-0.6,0-1,0.4-1,1v2c0,0.6,0.4,1,1,1h22c0.6,0,1-0.4,1-1V19z"/></g></svg></a>';
	header.innerHTML = header.innerHTML + '<div id="device-menu"><ul></ul></div>';
	var header__device_menu = document.querySelector('#header #device-menu ul'),
		device_menu_items = [];
	[].forEach.call(document.querySelectorAll('#header ul#main-nav > li'), function(el) { device_menu_items.push(el.cloneNode(true)); });
	[].forEach.call(document.querySelectorAll('#header ul#top-right-links > li'), function(el) { device_menu_items.push(el.cloneNode(true)); });
	[].forEach.call(document.querySelectorAll('#header ul#artist-nav > li:first-child'), function(el) { device_menu_items.push(el.cloneNode(true)); });
	[].forEach.call(document.querySelectorAll('#header ul.account-sub-menu > li'), function(el) { device_menu_items.push(el.cloneNode(true)); });
	[].forEach.call(device_menu_items, function(item) {
		header__device_menu.innerHTML = header__device_menu.innerHTML + item.outerHTML;
	});
	[].forEach.call(document.querySelectorAll('#header .menu-burger'), function(el) {
		el.addEventListener('click', function() {
			document.querySelector('body').classList.toggle('show-device-menu');
		});
	});
	[].forEach.call(document.querySelectorAll('#header #device-menu ul li a[data-toggle]'), function(el) {
		el.addEventListener('click', function() {
			document.querySelector('body').classList.remove('show-device-menu');
		});
	});
	
	
	[].forEach.call(document.querySelectorAll('ul.nav li.has-sub-menu > a'), function(el) {
		el.addEventListener('click', function() {
			for(let sibling of this.parentNode.children) {
				if(sibling !== this) {
					if(window.getComputedStyle(sibling).display === 'block')
						sibling.style.display = 'none';
					else
						sibling.style.display = 'block';
				}
			}
			for(let li of this.parentNode.parentNode.children) {
				if(li !== this.parentNode
				&& li.querySelector('ul.sub-menu') != null)
					li.querySelector('ul.sub-menu').style.display = 'none';
			}
		});
	});
	
});
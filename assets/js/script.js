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
	
	[].forEach.call(document.querySelectorAll('ul.nav.nav-tabs > li > a'), function(el) {
		el.addEventListener('click', function(e) {
			e.preventDefault();
			var parent_li = this.parentNode,
				parent_ul = parent_li.parentNode,
				target_tab_pane = document.querySelector(this.getAttribute('href'));
			for(let child_li of parent_ul.children) {
				child_li.classList.remove('active');
				if(child_li !== parent_li)
					document.querySelector(child_li.querySelector('a').getAttribute('href')).classList.remove('in');
					document.querySelector(child_li.querySelector('a').getAttribute('href')).classList.remove('active');
			}
			parent_li.classList.add('active');
			target_tab_pane.classList.add('in');
			target_tab_pane.classList.add('active');
		});
	});
	
	[].forEach.call(document.querySelectorAll('input[type="text"].numerify'), function(el) {
		if(!el.parentNode.classList.contains('numerified')) {
			var wrapper = document.createElement('div');
			wrapper.classList.add('numerified');
			helper_wrap(el, wrapper);
			el.parentNode.innerHTML =
				'<a href="javascript: void(0)" class="dec"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve"><polyline points="4,8 16,8 16,12 4,12 " /></svg></a>'
				+ el.parentNode.innerHTML
				+ '<a href="javascript: void(0)" class="inc"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 20 20" style="enable-background:new 0 0 20 20;" xml:space="preserve"><polyline points="8,0 12,0 12,8 20,8 20,12 12,12 12,20 8,20 8,12 0,12 0,8 8,8 " /></svg></a>';
		}
	});
	
	[].forEach.call(document.querySelectorAll('.numerified .inc, .numerified .dec'), function(el) {
		el.addEventListener('click', function(e) {
			e.preventDefault();
			var input = this.parentNode.querySelector('input'),
				min = (typeof(input.getAttribute('min')) == 'undefined' || isNaN(input.getAttribute('min')) || input.getAttribute('min') == null) ? 1 : parseInt(input.getAttribute('min')),
				max = (typeof(input.getAttribute('max')) == 'undefined' || isNaN(input.getAttribute('max')) || input.getAttribute('max') == null) ? 20 : parseInt(input.getAttribute('max')),
				val = input.value;
			val = isNaN(val) ? min : parseInt(val);
			val = this.classList.contains('dec') ? (val - 1) : (val + 1);
			val = (val > max) ? max : val;
			val = (val < min) ? min : val;
			input.value = val;
			if(typeof(input.getAttribute('data-onchange')) != 'undefined'
			&& typeof(window[input.getAttribute('data-onchange')]) != 'undefined') {
				window[input.getAttribute('data-onchange')]();
			}
		});
	});
	[].forEach.call(document.querySelectorAll('.numerified input'), function(el) {
		el.addEventListener('focus', function(e) {
			this.blur();
		});
		el.addEventListener('keyup change blur', function(e) {
			e.preventDefault();
			var val = this.value;
			if(isNaN(val)
			|| val < 1) this.value = '1';
			if(!isNaN(val)
			&& val > 20) this.value = '20';
		});
	});
	
	window.update_ticket_purchase_amount = function() {
		var price = parseInt(document.querySelector('.ticket-price-qty .price').getAttribute('data-price')),
			qty = parseInt(document.querySelector('.ticket-price-qty .qty input').value);
		document.querySelector('.total-ticket-price').innerHTML = (price * qty)+' SEK';
	};
	
	[].forEach.call(document.querySelectorAll('#purchase-ticket.modal .purchase-continue-to-payment'), function(el) {
		el.addEventListener('click', function(e) {
			e.preventDefault();
			document.querySelector('#purchase-ticket-details').classList.remove('in');
			document.querySelector('#purchase-ticket-details').classList.remove('active');
			document.querySelector('#purchase-ticket-payment').classList.add('in');
			document.querySelector('#purchase-ticket-payment').classList.add('active');
		});
	});
	
});

function helper_wrap(el, wrapper) {
	el.parentNode.insertBefore(wrapper, el);
	wrapper.appendChild(el);
}
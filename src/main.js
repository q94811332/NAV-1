const $siteList = $('.siteList');
const $lastLi = $siteList.find('li:last');
const x = localStorage.getItem('x');
xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'W', logoType: 'text', url: 'https://wangdoc.com/javascript/' },
    { logo: 'B', logoType: 'img', url: 'https://www.bilibili.com/' }
]

const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') //删除/开头的内容
}
const render = () => {
    $siteList.find('li:not(:last)').remove();
    hashMap.forEach((node, index) => {
        console.log(index)
        const $li = $(`<li>
            <a href="${node.url}">
                <div class="site">
                    <div class="logo">${node.logo[0]}</div>
                    <div class="link">${simplifyUrl(node.url)}</div>
                    <div class="close">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-close"></use>
                        </svg><div>
                </div>
            </a>
        </li>`).insertBefore($lastLi);
        $li.on('click', () => {
            window.open(node.url, '_self')
        })
        $li.on('click', '.close', (e) => {
            hashMap.splice(index, 1)
            render()
            return false;
        })
    })
}
render();

$('.addButton')
    .on('click', () => {
        let url = window.prompt('请输入网站');
        if (url.indexOf !== 0) {
            url = 'https://' + url;
        }
        hashMap.push({
            logo: simplifyUrl(url)[0].toUpperCase(),
            logoType: 'text',
            url: url
        })
        render();
    })
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}

$(document).on('keypress', (e) => {
    const { key } = e //key =e.key 简写后
    for (let i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
})
import urllib.request
import re
from collections import Counter

req = urllib.request.Request('https://newtwen.com', headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')
css_links = re.findall(r'<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"', html)
css_content = ''
for l in css_links:
    url = l if l.startswith('http') else 'https://newtwen.com' + l
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        css_content += urllib.request.urlopen(req).read().decode('utf-8')
    except:
        pass

colors = re.findall(r'#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b', css_content)
reds = [c.upper() for c in colors if c.upper().startswith('F') or c.upper().startswith('E')]
print("Common colors:")
print(Counter(reds).most_common(15))

const fs = require('fs');
let html = fs.readFileSync('C:\\Users\\archi\\Downloads\\Code Red 4.0\\Demo\\index.html', 'utf8').replace(/\r/g, '');
let lines = html.split('\n');
let section = lines.slice(373, 648).join('\n'); // 374 to 648

// Basic JSX conversion
section = section.replace(/class=/g, 'className=');
section = section.replace(/<!--(.*?)-->/gs, '{/* $1 */}');
section = section.replace(/<img([^>]*[^/])>/g, '<img$1 />');
section = section.replace(/<input([^>]*[^/])>/g, '<input$1 />');
section = section.replace(/<br>/g, '<br />');
section = section.replace(/onmouseover/g, 'onMouseOver');
section = section.replace(/onmouseout/g, 'onMouseOut');
section = section.replace(/allowfullscreen=""/g, 'allowFullScreen={true}');
section = section.replace(/referrerpolicy/g, 'referrerPolicy');
section = section.replace(/frameborder/g, 'frameBorder');
section = section.replace(/aria-hidden/g, 'aria-hidden');

// Style object conversion
section = section.replace(/style="([^"]*)"/g, (match, p1) => {
  let styleObj = {};
  p1.split(';').forEach(rule => {
    if(!rule.trim()) return;
    let parts = rule.split(':');
    let key = parts[0].trim().replace(/-([a-z])/g, g => g[1].toUpperCase());
    let val = parts.slice(1).join(':').trim(); // in case value has colon
    styleObj[key] = val;
  });
  return 'style={' + JSON.stringify(styleObj) + '}';
});

// FIX 1: Missing div closing tag in prize grid
section = section.replace(
  '        </div>\n    </div>\n  </section>',
  '        </div>\n    </div>\n  </div>\n  </section>'
);

// FIX 2: Replace iframe with Tunnel
section = section.replace(
  '<iframe src="/tunnel/index.html" frameBorder="0" style={{"width":"100%","height":"100%","position":"absolute","top":"0","left":"0"}}></iframe>',
  '<Tunnel />'
);

// FIX 3: Add missing closing div before the end section of launchpad
section = section.replace(
  'REGISTER NOW</button>\n      </div>\n  </section>',
  'REGISTER NOW</button>\n      </div>\n    </div>\n  </section>'
);

let jsxCode = `
import React from 'react';
import './DemoStyles.css';
import Tunnel from './Tunnel';

export default function PrizeAndFooter() {
  return (
    <>
      ${section}
    </>
  );
}
`;
fs.writeFileSync('C:\\Users\\archi\\Downloads\\Projects\\codered-X-master\\src\\PrizeAndFooter.jsx', jsxCode);

const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = [...walk('./app'), ...walk('./components')];

files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  if (content.includes('className="italic"') || content.includes(' italic"') || content.includes('"italic ')) {
    content = content.replace(/className="italic"/g, 'className="text-gradient"');
    content = content.replace(/ italic"/g, ' text-gradient"');
    content = content.replace(/"italic /g, '"text-gradient ');
    fs.writeFileSync(f, content);
  }
});
console.log('Replaced all italic classes with text-gradient');

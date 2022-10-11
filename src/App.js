import './App.scss';
import React, {Component} from 'react';
import { marked } from 'marked';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { faFileCode } from '@fortawesome/free-regular-svg-icons'

const placeHolder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

// Set options
// `highlight` example uses https://highlightjs.org
marked.setOptions({
  highlight: function(code) {
    const hljs = require('highlight.js');
    console.log(hljs.highlightAuto(code).value);
    return hljs.highlightAuto(code).value;
    // return hljs.highlight(code, {language: 'JavaScript'}).value
  },
  // highlight: function (code) {
  //   return Prism.highlight(code, Prism.languages.javascript, 'javascript');
  // },
  breaks: true
});

class App extends Component {

  constructor (props){
    super(props);
    this.state = {
      markdown: placeHolder,
      toHtml: this.translateToMarkdown(placeHolder)
    }
    this.handleChange = this.handleChange.bind(this);
    this.translateToMarkdown = this.translateToMarkdown.bind(this);
  }

  handleChange(e) {
    this.setState({
      markdown: e.target.value,
      toHtml: this.translateToMarkdown(e.target.value)
    });
    
  }

  translateToMarkdown(text) {
    var rawHtml = marked.parse(text);
    return { __html: rawHtml };
  }


  render() {
    return (
      <div className="App">
        <div className="editor_area">
          <div className='toolbar'>
            <FontAwesomeIcon icon={faPen} />
            <p>Editor</p>
          </div>
          <textarea id='editor'
                    value={this.state.markdown}
                    onChange={this.handleChange}>

          </textarea>
        </div>
        <div className='preview_area'>
          <div className='toolbar'>
            <FontAwesomeIcon icon={faFileCode} />
            <p>Preview</p>
          </div>
          <div id='preview' dangerouslySetInnerHTML={this.state.toHtml} />
          {/* <marked value={this.state.toHtml}></marked> */}
        </div>
      </div>
    );
  }
  
}

export default App;

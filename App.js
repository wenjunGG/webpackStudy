import React,{Component} from 'react';
import cssStyles from './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <div className="main">
                <p>Hello World,我是谁嗡嗡嗡</p>
            </div>

        );
    }
}

export default App;

// ReactDom.render(<App />,document.getElementById('root'));
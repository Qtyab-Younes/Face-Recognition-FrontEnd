import React, {Component} from 'react';
import Particle from './Particles.jsx';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';


const initialState = {
  input: "",
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    // password: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = initialState
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      // password: data.password,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = JSON.parse(data, null, 2).outputs[0].data.regions[0]
      .region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onEnter = (event) => {
    if (event.key === 'Enter') {
      this.onButtonSubmit();
    }
  }

  onButtonSubmit = () => {
    // this.setState({ imageUrl: this.state.input });
    const raw = JSON.stringify({
      user_app_id: {
        user_id: "e8rni7hesqqr",
        app_id: "1st-project",
      },
      inputs: [
        {
          data: {
            image: {
              url: this.state.input,
            },
          },
          
        },
      ],
    });

    fetch(
      "https://api.clarifai.com/v2/models/face-detection/outputs",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: "Key f38e224d011c496185623402a9418ae5",
        },
        body: raw,
      }
    )
    .then((response) => response.text())
    .then((response) => {
      if (response){
        fetch('http://localhost:3000/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        
        .then (count => {
          this.setState(Object.assign(this.state.user,{entries: count.entries }))
        })
/*         .then(count => {
          this.setState(Object.assign(this.state.user,{entries: count }))
        }) */
        .catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response));
    })
    .catch((error) => console.log('error', error));
      // .then((response) => response.text())
      // .then((result) => this.displayFaceBox(this.calculateFaceLocation(result)))
      // .catch((error) => console.log("error", error));
  };

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState)
    }else if (route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route});
  }

  render() {
    const { name, entries } = this.state.user;
    return (
      <div className="App">
        <Particle />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {this.state.route === 'home'
         ? 
          <div>
            <Logo />
            <Rank name={name} entries={entries} />
            <ImageLinkForm
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
            onEnter={this.onEnter}
            />
            <FaceRecognition box={this.state.box} imageUrl={this.state.input} />
          </div>
          : (
            this.state.route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
            : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
          )
        }
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { slide as Menu } from 'react-burger-menu';

import { signOutThunkCreator } from '../../store/reducers/authReducer';

class SignedInLinksBurger extends Component {
  constructor() {
    super();

    this.state = {
      menuOpen: false,
    };

    this.handleStateChange = this.handleStateChange.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  handleStateChange(state) {
    this.setState({ menuOpen: state.isOpen });
  }

  closeMenu() {
    this.setState({ menuOpen: false });
  }

  render() {
    return (
      <div>
        <Menu
          isOpen={this.state.menuOpen}
          onStateChange={state => this.handleStateChange(state)}
          right
          width="50%"
          styles={burgerStyles}
        >
          <div styles={divStyles}>
            <div>
              <NavLink onClick={() => this.closeMenu()} to="/">
                {this.props.profile.firstName ? (
                  <span className="navbar-text-color">
                    Hello, {this.props.profile.firstName}.
                  </span>
                ) : (
                  <span className="navbar-text-color">Hello.</span>
                )}
              </NavLink>
            </div>

            <div>
              <NavLink onClick={() => this.closeMenu()} to="/placeholder">
                <span className="bold-text-style navbar-text-color">
                  Placeholder
                </span>
              </NavLink>
            </div>

            <div>
              <NavLink
                onClick={() => {
                  this.closeMenu();
                  this.props.signOutThunk();
                }}
                to="/"
              >
                <span className="bold-text-style navbar-text-color">
                  Sign Out
                </span>
              </NavLink>
            </div>
          </div>
        </Menu>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  signOutThunk() {
    dispatch(signOutThunkCreator());
  },
});

export default connect(
  null,
  mapDispatchToProps
)(SignedInLinksBurger);

const burgerStyles = {
  bmBurgerButton: {
    position: 'fixed',
    width: '36px',
    height: '30px',
    right: '14px',
    top: '14px',
  },
  bmBurgerBars: {
    background: '#fafafa',
  },
  bmBurgerBarsHover: {
    background: '#a90000',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
    backgroundColor: '#fafafa',
    borderRadius: '20%',
  },
  bmCross: {
    background: '#003459',
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%',
  },
  bmMenu: {
    background: '#373a47',
    fontSize: '1.15em',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    backgroundColor: '#007ea7',
    padding: '0.8em',
  },
  bmItem: {
    display: 'inline-block',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
};

const divStyles = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
};

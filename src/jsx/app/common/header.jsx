import { State, Navigation } from 'react-router';
import classNames from 'classnames';

import { SidebarBtn } from 'global/jsx/sidebar_component';

class Brand extends React.Component {
  render() {
    return (
      <NavHeader {...this.props}>
        <NavBrand tabIndex='-1'>
          <img src='/imgs/ucm4.svg' alt='rubix' width='260' height='45' />
        </NavBrand>
      </NavHeader>
    );
  }
}

var MenuItem = React.createClass({
  render: function() {
    switch(this.props.className) {
      case 'divider':
      case 'dropdown-header':
        return (
          <li role="presentation" className={this.props.className}>{this.props.children}</li>
        );
      default:
        return (
          <li role="presentation" className={this.props.className}><a role="menuitem" tabindex={this.props.index} href={this.props.url}>{this.props.children}</a></li>
        );
    };
    
  }
});

var Dropdown = React.createClass({
  render: function() {
    if(typeof this.props.label != 'string')
      this.props.label = '';
    return (
      <div className="dropdown">
        <Button className={'dropdown-toggle ' + this.props.className} id={this.props.label.replace(/\s+/g, '')} data-toggle="dropdown">
          {this.props.label}
          <span className="caret"></span>
        </Button>
        <ul className="dropdown-menu" role="menu" aria-labelledby={this.props.label.replace(/\s+/g, '')}>
          {this.props.children}
        </ul>
      </div>
    );
  }
});

var DirectNavItem = React.createClass({
  mixins: [State, Navigation],
  render() {
    var active = false;
    var currentLocation = this.context.router.state.location.pathname;

    if(!active && this.props.path) {
      active = this.isActive(this.props.path) && (currentLocation == this.props.path);
    }

    var classes = classNames({
      'pressed': active
    });
    return (
      <NavItem className={classes} {...this.props}>
        <Link to={this.props.path}>
          <Icon bundle={this.props.bundle || 'fontello'} glyph={this.props.glyph} />
        </Link>
      </NavItem>
    );
  }
});



var HeaderNavigation = React.createClass({
  mixins: [State, Navigation],
  render() {
    var props = {
      ...this.props,
      className: classNames('pull-right', this.props.className)
    };

    return (
      <NavContent {...props}>
        <Nav>

        </Nav>
      </NavContent>
    );
  }
});


export default class Header extends React.Component {
  render() {
    return (
      <Grid id='navbar' {...this.props}>
        <Row>
          <Col xs={12}>
            <NavBar fixedTop id='rubix-nav-header'>
              <Container fluid>
                <Row>
                  <Col xs={3} visible='xs'>
                    <SidebarBtn />
                  </Col>
                  <Col xs={6} sm={4}>
                    <Brand />
                  </Col>
                  <Col xs={3} sm={8}>
                    <HeaderNavigation />
                  </Col>
                </Row>
              </Container>
            </NavBar>
          </Col>
        </Row>
      </Grid>
    );
  }
}

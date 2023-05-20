import { styled } from "styled-components";
import { Link, useRoute } from "wouter";

const NavBar = styled.nav`
  position: absolute;
  width: 100%;
  z-index: 101;

  padding: 4rem 4rem;
  color: white;
  font-weight: 200;

  display: flex;
  gap: 4rem;
`;

const NavList = styled.ul`
  flex: 1;
  list-style: none;

  display: flex;
  justify-content: center;
  gap: 4rem;
`;

const NavItem = styled.li`
  a {
    color: ${(props) => props.theme.colors.light};
    transition: all 0.3s;
    text-decoration: none;
    text-transform: uppercase;
  }
  a:hover {
    color: ${(props) => props.theme.colors.primary};
  }

  .active {
    color: ${(props) => props.theme.colors.primary};
    border-bottom: 1px solid;
  }
`;

const NavLogo = styled.div`
  flex: 1;
`;

const NavSocials = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;

  a {
    color: ${(props) => props.theme.colors.light};
    transition: all 0.3s;
    text-decoration: none;
  }

  a:hover {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const ActiveLink = (props) => {
  const [isActive] = useRoute(props.href);

  return (
    <Link {...props}>
      <a className={isActive ? "active" : ""}>{props.children}</a>
    </Link>
  );
};

const Navigation = () => {
  return (
    <NavBar>
      <NavLogo>logo</NavLogo>

      <NavList>
        <NavItem>
          <ActiveLink href="/works"> Works</ActiveLink>
        </NavItem>
        <NavItem>
          <ActiveLink href="/about">About</ActiveLink>
        </NavItem>
      </NavList>
      <NavSocials>
        <a href=""> hotriluc97@gmail.com</a>
      </NavSocials>
    </NavBar>
  );
};

export default Navigation;

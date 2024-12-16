import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "store";
import useOnClickOutside from "use-onclickoutside";

import Logo from "../../assets/icons/logo";

type HeaderType = {
  isErrorPage?: boolean;
};

const Header = ({ isErrorPage }: HeaderType) => {
  const router = useRouter();
  const { search: _search, ...remainingQuery } = router.query;
  const { cartItems } = useSelector((state: RootState) => state.cart);
  const { wishlistItems } = useSelector((state: RootState) => state.wishlist);
  const arrayPaths = ["/"];

  const [onTop, setOnTop] = useState(
    !(!arrayPaths.includes(router.pathname) || isErrorPage),
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navRef = useRef(null);
  const searchRef = useRef(null);

  const headerClass = () => {
    if (window.pageYOffset === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  };

  useEffect(() => {
    if (!arrayPaths.includes(router.pathname) || isErrorPage) {
      return;
    }

    headerClass();
    window.onscroll = function () {
      headerClass();
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const closeSearch = () => {
    setSearchOpen(false);
  };

  // on click outside
  useOnClickOutside(navRef, closeMenu);
  useOnClickOutside(searchRef, closeSearch);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim()) {
      // Update the route with the search query
      router.push({
        pathname: router.pathname,
        query: { ...router.query, search: searchText.trim() },
      });
    }
  };
  const clearSearch = () => {
    router.push({
      pathname: router.pathname,
      query: remainingQuery,
    })
    setSearchText('')
  };

  return (
    <header className={`site-header ${!onTop ? "site-header--fixed" : ""}`}>
      <div className="container">
        <Link href="/">
          <h1 className="site-logo">
            <Logo />
            E-Shop
          </h1>
        </Link>
        <nav
          ref={navRef}
          className={`site-nav ${menuOpen ? "site-nav--open" : ""}`}
        >
          <Link href="/products">Products</Link>
          <a href="#">Inspiration</a>
          <a href="#">Rooms</a>
          <button className="site-nav__btn">
            <p>Account</p>
          </button>
        </nav>

        <div className="site-header__actions">
          <div
            ref={searchRef}
            className={`search-form-wrapper ${searchOpen ? "search-form--active" : ""}`}
            style={{ position: 'relative' }}
          >
            <form className="search-form" onSubmit={handleSearchSubmit}>
              <i
                className="icon-cancel"
                onClick={() => setSearchOpen(!searchOpen)}
              />
              <input
                type="text"
                name="search"
                value={searchText}
                placeholder="Enter the product you are looking for"
                onChange={(e) => setSearchText(e.target.value)}
              />
              <button type="submit" style={{ display: "none" }} />
            </form>
            <i
              onClick={() => setSearchOpen(!searchOpen)}
              className="icon-search"
            />
            {/* Clar Search */}
            <button
              onClick={() => clearSearch()}
              style={{
                position: 'absolute',
                right: '30px',
                top: '-4px',
                backgroundColor: '#dedede',
                padding: '2px 10px',
                borderRadius: '5px',
                display: searchText ? 'block' : 'none',
                zIndex: '9999'
              }}
            >X</button>
          </div>
          <Link href="/cart" legacyBehavior>
            <button className="btn-cart">
              <i className="icon-cart" />
              {cartItems.length > 0 && (
                <span className="btn-cart__count">{cartItems.length}</span>
              )}
            </button>
          </Link>
          {/* Wishlist Icon */}
          <Link href="/wishlist" legacyBehavior>
            <button className="btn-cart">
              <i className="icon-heart" />
              {wishlistItems.length > 0 && (
                <span className="btn-cart__count">{wishlistItems.length}</span>
              )}
            </button>
          </Link>
          <Link href="/login" legacyBehavior>
            <button className="site-header__btn-avatar">
              <i className="icon-avatar" />
            </button>
          </Link>
          <button
            onClick={() => setMenuOpen(true)}
            className="site-header__btn-menu"
          >
            <i className="btn-hamburger">
              <span />
            </i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

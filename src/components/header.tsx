 import Logo from "@/assets/images/logo.svg";
import { useEffect, useState } from "react";
import classNames from "classnames";

const Header = () => {
  // const router = useRouter();
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

   const handleClick = () => {
    setOpen(!open);
  };
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  },[]);
  // Effect to disable scrolling when mobile menu is open
  useEffect(() => {
    if (open) {
      // Disable scrolling on body when menu is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when menu is closed
      document.body.style.overflow = '';
    }

    // Cleanup function to ensure scrolling is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={classNames(` w-full  transition-all border-b ease-in-out`, {
        'h-screen fixed top-0 z-50 !bg-[#06222B] !text-[#fff] ': open,
        'fixed top-0 z-50 left-0 bg-transparent text-white': !scrolled,
        'fixed top-0 left-0 z-50 bg-white shadow text-black': scrolled
      })}
    >
      <div className="container p-4 mx-auto justify-between flex items-center">
        <div className="lg:text-2xl font-bold">
          <div>
            <h1 className="lg:text-4xl font-bold  bg-clip-text text-black lg:leading-tight leading-snug   ">
              Newsletter Composer
            </h1>
            <p className="text-muted-foreground lg:block hidden text-xs font-light italic">
              Create beautiful email campaigns with live preview
            </p> 
          </div>
        </div>
        <nav></nav>
      </div>
    </header>
  );
};



export default Header;

"use client";

import Link from 'next/link';
import Image from 'next/image';
import {useState, useEffect} from 'react';
import {signIn,signOut,useSession, getProviders}
from 'next-auth/react';
 
const Nav = () => {
  const isUserLoggedIn = true;

  const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect (() =>{
    const setProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }

    setProviders( );
  }, [])
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href='/' className='flex gap-2 flex-center'>
        <Image src="/assets/images/logo.svg" alt=" Promtopia Log" 
        width={30} height={30} className="object-contain"/>  {/*change logo*/}
    
        <p className="logo_text">Promptopia</p> {/*logo_text is also responsive*/}
      </Link>

      {/*Desktop Navigation*/}
      <div className="sm:flex hidden">
        {isUserLoggedIn ? (
            <div className="flex gap-3 md:gap-5">
              <Link href="/create-prompt" className="black_btn">
              Create Post </Link> {/*black_btn is responsive*/}

              <button type="button" onClick={signOut} className="outline_btn">
                Sign Out
              </button>

              <Link href="/profile">
              <Image src="/assets/images/logo.svg" width={37} height={37}
              className="rounded-full" alt="profile"/> 
              </Link>
            </div>
            ):(
            <>
              {providers &&
                Object.values(providers).map((provider)=> (
                      <button type="button" key={provider.name} onClick={() => signIn (provider.id)}
                      className="black_btn">Sign In</button>
                  ))}
           </>  
        )}
      </div>

      {/*Mobile Navigation*/}
      <div className="sm:hidden flex relative"> {/*this isUserLoggedIn ? asks if user is logged in or not. If yes, div happens*/}
          {isUserLoggedIn ?  (  
            <div className="flex">
            <Image src="/assets/images/logo.svg" 
            width={37} height={37} className="rounded-full"
            alt="profile" onClick={() => setToggleDropdown ((prev) => !prev)}/> {/*this will set the variable to true from top*/}

            {toggleDropdown && (
              <div className="dropdown"> 
              <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown (false)}> My Profile</Link>
              
              <Link href="/ promptCard" className="dropdown_link" onClick={() => setToggleDropdown (false)}> Create Prompt</Link>

              <button type="button" onClick={() => { setToggleDropdown(false); 
              signOut();
              }} 
              className="mt-5 w-full black_btn"> Sign Out</button>
              </div>
            )}
            </div>
          ): (
            <>
              {providers &&
                Object.values(providers).map((provider)=> (
                      <button 
                      type="button" 
                      key={provider.name} 
                      onClick={() => signIn(provider.id)}
                      className="black_btn">Sign In</button>
                  ))}
           </>  
          )}
        
      </div>
    </nav>
  )
}  
 


{/*1.how to fix this error Error: 
  × You're importing a component that needs useState. It only works in a Client Component 
  but none of its parents are marked with "use client", so they're Server Components by default.
  Write "use client"; on top of this page.*/}
{/*@.When re-writing the code start with the layout page , this one then the styles-globals.*/}  
export default Nav
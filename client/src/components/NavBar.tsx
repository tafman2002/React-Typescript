export const NavBar = () => {
    const navigaitionList: Array<string> = ['Home'];
    const listItems = navigaitionList.map((link) =>
        <li><a href={link}>{link}</a></li>
    );

    return (
        <div className='main-navigation'>
            <nav className='main-navigation side-navigation'>
                <ul>
                    {listItems}
                </ul>
                <div className='nav--bottom'>
                    {/*<button className='button-2'><a href='/signout'>Log out</a></button>*/}
                </div>
            </nav>
        </div>
    );
}
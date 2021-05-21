import React from 'react';
import {store} from '../../../stores/store';
import {Redirect, Route, Switch} from "react-router-dom";
import {Footer} from "../Footer/Footer";
import {Header} from "../Header/Header";
import {Menu} from "../Menu/Menu";
import {PageTemplate} from "../PageTemplate/PageTemplate";
import About from "../../pages/About/About";
import BookList from "../../pages/Book/BookList";
import {Community} from "../../pages/Community/Community";
import {Test} from "../../pages/Test/Test";

export const HomePage = () => {

    const [open, setOpen] = React.useState(true);

    const leftMenuhandle = (e) => {
        setOpen(e);
    };

    const isAuthenticated = store.isAuthorized;
    const userInfo = JSON.parse(sessionStorage.getItem('user'));
    console.log(isAuthenticated, userInfo);

    return (
        <>
            {isAuthenticated ?
                (
                    <PageTemplate
                        header={<Header/>}
                        menu={<Menu onDrawer={leftMenuhandle} userInfo={userInfo}/>}
                        footer={<Footer/>}
                        notFound={false}
                        leftMenu={open}
                    >
                        <Switch>
                            <Route path={"/"} exact>
                                <About/>
                            </Route>
                            <Route path={"/community"} children={<Community userInfo={userInfo}/>}/>
                            <Route path={"/book"} children={<BookList userInfo={userInfo}/>}/>
                            <Route path={"/test"} children={<Test userInfo={userInfo}/>}/>
                            <Route path={"/not-found2"} exact component={BookList}/>
                            <Route path={"*"}>
                                <Redirect to={"/not-found"} />
                            </Route>

                        </Switch>
                    </PageTemplate>
                )
                : (
                    <Redirect to={"/login"}/>
                )
            }
        </>
    );
}
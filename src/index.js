import React from "react";
import ReactDOM from "react-dom";
import "assets/css/App.css";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthLayout from "layouts/auth";
import AdminLayout from "layouts/admin";
import RtlLayout from "layouts/rtl";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "theme/theme";
import { ThemeEditorProvider } from "@hypertheme-editor/chakra-ui";
import { createStore } from "redux";
import rootReducer from "redux/rootReducer";
import { Provider } from "react-redux";
import SystemLayout from "layouts/system"; //이혜윤 - 추가
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

const store = createStore(rootReducer);

ReactDOM.render(

	<ChakraProvider theme={theme}>
		<Provider store={store}>
			<ThemeEditorProvider>
				<BrowserRouter>
					<Switch>
						<Route path={`/system`} component={SystemLayout}/>
						<Route path={`/auth`} component={AuthLayout} />
						<Route path={`/admin`} component={AdminLayout} />
						<Route path={`/rtl`} component={RtlLayout} />
						{/* 로그인 안했을때 */}
						<Redirect from='/' to='/auth/login' />
					</Switch>
				</BrowserRouter>
			</ThemeEditorProvider>
	</Provider>
	</ChakraProvider>,
	document.getElementById('root')
);

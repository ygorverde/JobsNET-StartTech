import { Switch, Route } from "react-router-dom";

import { Home } from '../../pages/Home';

import { Form } from '../../pages/Form';

export function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/form" component={Form} />
        </Switch>
    );
}
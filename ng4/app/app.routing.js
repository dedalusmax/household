"use strict";
var router_1 = require("@angular/router");
var about_component_1 = require("./components/about.component");
var login_component_1 = require("./components/login.component");
var register_component_1 = require("./components/register.component");
var dashboard_component_1 = require("./components/dashboard.component");
var profile_component_1 = require("./components/profile.component");
var accounts_component_1 = require("./components/accounts.component");
var wallet_component_1 = require("./components/wallet.component");
var auth_guard_1 = require("./auth.guard");
var appRoutes = [
    { path: '', component: about_component_1.AboutComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'profile', component: profile_component_1.ProfileComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'accounts', component: accounts_component_1.AccountsComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'wallet', component: wallet_component_1.WalletComponent, canActivate: [auth_guard_1.AuthGuard] },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent, canActivate: [auth_guard_1.AuthGuard] }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map
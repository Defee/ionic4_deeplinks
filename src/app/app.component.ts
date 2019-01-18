import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Deeplinks } from '@ionic-native/deeplinks/ngx';
import { Tab1Page } from './tab1/tab1.page';
import { Tab2Page } from './tab2/tab2.page';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html'
})
export class AppComponent {
	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		protected deepLinks: Deeplinks,
		protected router: Router
	) {
		this.initializeApp();
	}

	async initializeApp() {
		await this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
			this.deepLinks
				.route({
					'/about-us': {
						someKindofData: [ { id: 1, name: 'asdads' }, { id: 2, name: 'asdads' } ]
					}
				})
				.subscribe(
					(match) => {
						console.log('Successfully matched route', match);
						console.log('args', match.$args);
						console.log('link', match.$link);
						if (match.$link.url.includes('about-us')) {
							this.router.navigate([ 'tabs/tab2' ]);
						}
						// match.$route - the route we matched, which is the matched entry from the arguments to route()
						// match.$args - the args passed in the link
						// match.$link - the full link data
					},
					(nomatch) => {
						// nomatch.$link - the full link data
						// tslint:disable-next-line:quotemark
						console.error("Got a deeplink that didn't match", nomatch);
						console.error('Link data', nomatch.$link);
					}
				);
		});
	}
}

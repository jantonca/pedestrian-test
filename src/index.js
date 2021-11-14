const { registerPlugin } = wp.plugins;
import PedestrianAdvertiserSidebar from './pedestrian-advertisements-sidebar';
/**
 * Register plugin
 */
registerPlugin('pedestrian-advertisements-sidebar', {
	render() {
		return <PedestrianAdvertiserSidebar />;
	},
});

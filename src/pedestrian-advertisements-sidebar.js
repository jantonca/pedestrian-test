'use strict';

const { __ } = wp.i18n; //Internationalization utilities for client-side localization
const { compose } = wp.compose; //package of Hooks and Higher Order Components
const { withSelect, withDispatch } = wp.data; //interactions with the @wordpress/data API can be performed via withSelect and withDispatch higher order components.

const { PluginDocumentSettingPanel } = wp.editPost; //registering a UI to edit Document settings
const { ToggleControl, RadioControl, TextControl, PanelRow } = wp.components; // Library of generic WordPress components

const PedestrianAdvertiserSidebar = ({
	postType,
	pedestrianPostMeta,
	setPedestrianPostMeta,
}) => {
	if ('post' !== postType) return null; // Will only render component for post type 'post'

	return (
		<PluginDocumentSettingPanel
			title={__(
				'Advertising Settings',
				'pedestrian-advertisements-sidebar'
			)}
			icon="nametag"
			initialOpen="true"
		>
			<PanelRow>
				<ToggleControl
					label={__(
						'Advertisements',
						'pedestrian-advertisements-sidebar'
					)}
					onChange={(value) =>
						setPedestrianPostMeta({ advertisements: value })
					}
					checked={pedestrianPostMeta.advertisements}
				/>
			</PanelRow>
			<PanelRow>
				<RadioControl
					label="Commercial content type"
					help="The type of the commercial content"
					selected={pedestrianPostMeta.commercial_content_type}
					options={[
						{ label: 'None', value: 'none' },
						{ label: 'Sponsored content', value: 'sponsored' },
						{ label: 'Partnered content', value: 'partnered' },
						{ label: 'Brought to you by', value: 'brought' },
					]}
					onChange={(value) =>
						setPedestrianPostMeta({
							commercial_content_type: value,
						})
					}
				/>
			</PanelRow>
			{'none' !== pedestrianPostMeta.commercial_content_type && (
				<PanelRow>
					<TextControl
						label={__(
							'Advertise name',
							'pedestrian-advertisements-sidebar'
						)}
						value={pedestrianPostMeta.advertise_name}
						onChange={(value) =>
							setPedestrianPostMeta({ advertise_name: value })
						}
					/>
				</PanelRow>
			)}
		</PluginDocumentSettingPanel>
	);
};

/**
 * Map state to props
 */
export default compose([
	withSelect((select) => {
		const { getCurrentPostType, getEditedPostAttribute } = select('core/editor');
		return {
			pedestrianPostMeta: getEditedPostAttribute('meta'),
			postType: getCurrentPostType(),
		};
	}),
	withDispatch((dispatch) => {
		const { editPost } = dispatch('core/editor');
		return {
			setPedestrianPostMeta(updatePostMeta) {
				editPost({ meta: updatePostMeta });
			},
		};
	}),
])(PedestrianAdvertiserSidebar);

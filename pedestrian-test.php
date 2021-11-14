<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://pedestriangroup.com.au/
 * @since             1.0.0
 * @package           Pedestrian_Test
 *
 * @wordpress-plugin
 * Plugin Name:       Pedestrian Test
 * Plugin URI:        https://pedestriangroup.com.au/
 * Description:       This is a test for The Pedestrian Group.
 * Version:           1.0.0
 * Author:            Jose Anton
 * Author URI:        https://pedestriangroup.com.au/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       pedestrian-test
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define( 'PEDESTRIAN_TEST_VERSION', '1.0.0' );

add_action('init', function(){

	register_post_meta(
		'post',
		'advertisements',
		[
		  'show_in_rest' => true,
		  'single' => true,
		  'type' => 'boolean',
		]
	);

	register_post_meta(
		'post',
		'commercial_content_type',
		[
		  'show_in_rest' => true,
		  'single' => true,
		  'type' => 'string',
		  'default' => 'none',
		]
	);
  
	register_post_meta(
	  'post',
	  'advertise_name',
	  [
		'show_in_rest' => true,
		'single' => true,
		'type' => 'string',
	  ]
	);
	
});

function pedestrian_pest_enqueue_scripts() {

	// Post meta options.
	wp_register_script(
		'pedestrian-test-meta-toggles',
		plugins_url( '/pedestrian-test/build/index.js', dirname( __FILE__ ) ),
		array(),
		null,
		true
	);
	wp_enqueue_script( 'pedestrian-test-meta-toggles' );

}
add_action( 'enqueue_block_editor_assets', 'pedestrian_pest_enqueue_scripts' );
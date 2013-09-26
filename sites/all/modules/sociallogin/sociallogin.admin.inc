<?php
/**
 * @file
 * Admin page callback file for the sociallogin module.
 */

/**
 * Implements Admin setting for the sociallogin module.
 */
function sociallogin_admin_settings($form, &$form_state) {
  $form['settings'] = array(
    '#type' => 'horizontal_tabs',
  );
  $group = 'setup';
  $get_sociallogin = '';
  if (!variable_get('sociallogin_apikey', FALSE)) {
    $get_sociallogin = t('For create a Social Login account, please visit <a href="@get_sociallogin" target="_blank">LoginRadius</a>', array('@get_sociallogin' => 'http://www.Loginradius.com/'));
  }
  $form[$group] = array(
    '#type' => 'fieldset',
    '#title' => t('SOCIAL LOGIN SETUP OPTIONS'),
    '#group' => 'settings',
    '#description' => $get_sociallogin . t('', array('@account_link' => 'http://LoginRadius.com/')),
  );
  $form[$group]['sociallogin_apikey'] = array(
    '#type' => 'textfield',
    '#title' => t('Social Login API Key'),
    '#default_value' => variable_get('sociallogin_apikey', ''),
    '#description' => t('Paste Social Login API Key here. To get the API Key, log in to <a href="@get_sociallogin" target="_blank">LoginRadius</a>', array('@get_sociallogin' => 'http://www.Loginradius.com/')),
    '#required' => TRUE,
  );
  $form[$group]['sociallogin_apisecret'] = array(
    '#type' => 'textfield',
    '#title' => t('Social Login API Secret'),
    '#default_value' => variable_get('sociallogin_apisecret', ''),
    '#description' => t('Paste Social Login API Secret here. To get the API Secret, log in to <a href="@get_sociallogin" target="_blank">LoginRadius</a>', array('@get_sociallogin' => 'http://www.Loginradius.com/')),
    '#required' => TRUE,
  );
  $form[$group]['sociallogin_label_string'] = array(
    '#type' => 'textfield',
    '#title' => t('Social Login Label'),
    '#default_value' => variable_get('sociallogin_label_string', 'Please Login with'),
    '#description' => t('This text will be displayed just above Social Login interface.'),
    '#required' => TRUE,
  );
  $form[$group]['sociallogin_popup_def_ifwidth'] = array(
    '#type' => 'textfield',
    '#title' => t('IFrame default width'),
    '#size' => 5,
    '#default_value' => variable_get('sociallogin_popup_def_ifwidth', 169),
    '#required' => TRUE,
  );
  $form[$group]['sociallogin_popup_def_ifheight'] = array(
    '#type' => 'textfield',
    '#title' => t('IFrame default height'),
    '#size' => 5,
    '#default_value' => variable_get('sociallogin_popup_def_ifheight', 50),
    '#required' => TRUE,
  );
  $group = 'authentication';
  $form[$group] = array(
    '#type' => 'fieldset',
    '#title' => t('SOCIAL LOGIN AUTHENTICATION'),
    '#group' => 'settings',
  );
  $form[$group]['sociallogin_link_account'] = array(
    '#type' => 'checkbox',
    '#title' => t('Link to existing account'),
    '#default_value' => variable_get('sociallogin_link_account', 1) ? 1 : 0,
    '#description' => t('Attach Social Login ID with existing user accounts.'),
  );
  $form[$group]['sociallogin_attach_login_form'] = array(
    '#type' => 'checkbox',
    '#title' => t('Enable Social Login on user login block'),
    '#default_value' => variable_get('sociallogin_attach_login_form', 1) ? 1 : 0,
    '#description' => t('Attach Social Login interface with existing login block form.'),
  );
  $form[$group]['sociallogin_showicon_location'] = array(
    '#type' => 'radios',
    '#title' => t('Select position of Social Login module to display on login/register form.'),
    '#default_value' => variable_get('sociallogin_showicon_location', 1),
    '#options' => array(
      0 => t('At the Top'),
      1 => t('At the Bottom'),
    ),
  );
  $form[$group]['sociallogin_email_required'] = array(
    '#type' => 'checkbox',
    '#title' => t('Email Required'),
    '#default_value' => variable_get('sociallogin_email_required', 1) ? 1 : 0,
    '#description' => t('Few ID providers do not provide user Email ID. Check if you want a email pop-up after logging in or leave uncheck if you want to auto generate users email addresses.'),
  );
  $form[$group]['sociallogin_userlogin_redirect'] = array(
    '#type' => 'radios',
    '#title' => t('Redirect user after login'),
    '#default_value' => variable_get('sociallogin_userlogin_redirect', 0),
    '#options' => array(
      0 => t('Redirect to same page of site'),
      1 => t('Redirect to home page of site'),
      2 => t('Redirect to profile page of site'),
    ),
  );
  return system_settings_form($form);
}

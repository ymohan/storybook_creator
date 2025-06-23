import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const AccountManagementSection = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [accountData, setAccountData] = useState({
    email: 'parent@example.com',
    subscriptionPlan: 'Premium Family',
    subscriptionStatus: 'Active',
    nextBillingDate: '2024-02-15',
    storiesCreated: 47,
    storageUsed: '2.3 GB',
    storageLimit: '10 GB',
    apiKey: 'sk-1234567890abcdef...',
    dataRetention: '2-years',
    shareAnalytics: true,
    marketingEmails: false
  });

  const subscriptionPlans = [
    {
      name: 'Free',
      price: '$0/month',
      features: ['5 stories per month', 'Basic themes', 'Standard illustrations'],
      current: false
    },
    {
      name: 'Premium Family',
      price: '$9.99/month',
      features: ['Unlimited stories', 'All themes & styles', 'HD illustrations', 'Audio narration', 'Priority support'],
      current: true
    },
    {
      name: 'Educator',
      price: '$19.99/month',
      features: ['Everything in Premium', 'Classroom management', 'Bulk export', 'Educational analytics'],
      current: false
    }
  ];

  const handleDataExport = () => {
    // Mock data export functionality
    alert('Your data export has been initiated. You will receive an email with download link within 24 hours.');
  };

  const handleAccountDeletion = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone and all your stories will be permanently deleted.'
    );
    if (confirmed) {
      alert('Account deletion request submitted. You will receive a confirmation email.');
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-heading text-text-primary mb-2">Account Management</h2>
        <p className="text-text-secondary">Manage your subscription, API settings, and account preferences</p>
      </div>

      {/* Account Overview */}
      <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border border-primary-200 rounded-storybook p-6">
        <h3 className="text-lg font-heading text-text-primary mb-4 flex items-center">
          <Icon name="User" size={20} className="mr-2 text-primary" />
          Account Overview
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-heading text-primary">{accountData.storiesCreated}</div>
            <div className="text-sm text-text-secondary">Stories Created</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading text-accent">{accountData.storageUsed}</div>
            <div className="text-sm text-text-secondary">Storage Used</div>
            <div className="w-full bg-accent-100 rounded-full h-2 mt-2">
              <div className="bg-accent h-2 rounded-full" style={{ width: '23%' }}></div>
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading text-success">{accountData.subscriptionStatus}</div>
            <div className="text-sm text-text-secondary">Subscription Status</div>
          </div>
        </div>
      </div>

      {/* Subscription Management */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading text-text-primary flex items-center">
          <Icon name="CreditCard" size={20} className="mr-2 text-secondary" />
          Subscription Management
        </h3>
        <div className="bg-surface border border-primary-200 rounded-storybook p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-medium text-text-primary">Current Plan: {accountData.subscriptionPlan}</div>
              <div className="text-sm text-text-secondary">Next billing: {accountData.nextBillingDate}</div>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-primary-50 text-primary hover:bg-primary-100 rounded-storybook storybook-transition">
                Change Plan
              </button>
              <button className="px-4 py-2 bg-surface text-text-secondary hover:bg-primary-50 border border-primary-200 rounded-storybook storybook-transition">
                Billing History
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.name}
              className={`
                p-4 border-2 rounded-storybook storybook-transition
                ${plan.current 
                  ? 'border-primary bg-primary-50' :'border-primary-200 bg-surface hover:border-primary-300'
                }
              `}
            >
              <div className="text-center">
                <h4 className="font-heading text-text-primary">{plan.name}</h4>
                <div className="text-2xl font-heading text-primary my-2">{plan.price}</div>
                <ul className="text-sm text-text-secondary space-y-1 mb-4">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Icon name="Check" size={14} className="mr-2 text-success" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {plan.current ? (
                  <div className="px-4 py-2 bg-primary text-white rounded-storybook text-sm">
                    Current Plan
                  </div>
                ) : (
                  <button className="px-4 py-2 bg-surface text-primary border border-primary rounded-storybook hover:bg-primary-50 storybook-transition text-sm">
                    Select Plan
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Configuration */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading text-text-primary flex items-center">
          <Icon name="Key" size={20} className="mr-2 text-accent" />
          OpenAI API Configuration
        </h3>
        <div className="bg-surface border border-primary-200 rounded-storybook p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                OpenAI API Key
              </label>
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <input
                    type={showApiKey ? 'text' : 'password'}
                    value={accountData.apiKey}
                    readOnly
                    className="w-full px-3 py-2 border border-primary-200 rounded-storybook bg-background text-text-primary"
                  />
                  <button
                    onClick={() => setShowApiKey(!showApiKey)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
                  >
                    <Icon name={showApiKey ? 'EyeOff' : 'Eye'} size={16} />
                  </button>
                </div>
                <button className="px-4 py-2 bg-accent-50 text-accent hover:bg-accent-100 rounded-storybook storybook-transition">
                  Update
                </button>
              </div>
              <p className="text-xs text-text-secondary mt-1">
                Your API key is encrypted and secure. It's used to generate stories and illustrations.
              </p>
            </div>
            <div className="flex items-center justify-between p-3 bg-warning-50 border border-warning-200 rounded-storybook">
              <div className="flex items-center space-x-2">
                <Icon name="AlertTriangle" size={16} className="text-warning" />
                <span className="text-sm text-warning-700">API Usage: 847 requests this month</span>
              </div>
              <button className="text-sm text-warning-700 hover:text-warning-800 underline">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy & Data Settings */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading text-text-primary flex items-center">
          <Icon name="Shield" size={20} className="mr-2 text-success" />
          Privacy & Data Settings
        </h3>
        <div className="space-y-4">
          <div className="bg-surface border border-primary-200 rounded-storybook p-4">
            <h4 className="font-medium text-text-primary mb-3">Data Retention</h4>
            <div className="space-y-2">
              {['1-year', '2-years', '5-years', 'Indefinite'].map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="dataRetention"
                    value={option}
                    checked={accountData.dataRetention === option}
                    className="mr-3 text-primary"
                  />
                  <span className="text-text-primary">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-surface border border-primary-200 rounded-storybook p-4 space-y-3">
            <label className="flex items-center justify-between">
              <div>
                <div className="font-medium text-text-primary">Share Anonymous Analytics</div>
                <div className="text-sm text-text-secondary">Help improve the app by sharing usage data</div>
              </div>
              <input
                type="checkbox"
                checked={accountData.shareAnalytics}
                className="w-5 h-5 text-primary rounded focus:ring-primary"
              />
            </label>

            <label className="flex items-center justify-between">
              <div>
                <div className="font-medium text-text-primary">Marketing Emails</div>
                <div className="text-sm text-text-secondary">Receive updates about new features and tips</div>
              </div>
              <input
                type="checkbox"
                checked={accountData.marketingEmails}
                className="w-5 h-5 text-primary rounded focus:ring-primary"
              />
            </label>
          </div>
        </div>
      </div>

      {/* Data Export & Account Actions */}
      <div className="space-y-4">
        <h3 className="text-lg font-heading text-text-primary flex items-center">
          <Icon name="Download" size={20} className="mr-2 text-warning" />
          Data Export & Account Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={handleDataExport}
            className="flex items-center justify-center space-x-2 p-4 bg-surface border border-primary-200 hover:bg-primary-50 rounded-storybook storybook-transition"
          >
            <Icon name="Download" size={18} className="text-primary" />
            <span className="font-medium text-text-primary">Export All Data</span>
          </button>
          <button
            onClick={handleAccountDeletion}
            className="flex items-center justify-center space-x-2 p-4 bg-error-50 border border-error-200 hover:bg-error-100 rounded-storybook storybook-transition"
          >
            <Icon name="Trash2" size={18} className="text-error" />
            <span className="font-medium text-error">Delete Account</span>
          </button>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-6 border-t border-primary-200">
        <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-storybook hover:scale-105 storybook-transition shadow-storybook">
          <Icon name="Save" size={18} />
          <span>Save Changes</span>
        </button>
      </div>
    </div>
  );
};

export default AccountManagementSection;
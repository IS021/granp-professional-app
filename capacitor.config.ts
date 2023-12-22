import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'granp.app.professional',
  appName: 'GranP Professional',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    CapacitorHttp: {
      enabled: true,
    }
  }
};

export default config;

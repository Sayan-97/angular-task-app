export interface Environment {
  production: boolean;
  apiUrl: string;
}

export const environment: Environment = {
  production: false,
  apiUrl: 'https://677106cf2ffbd37a63ce033c.mockapi.io/',
};

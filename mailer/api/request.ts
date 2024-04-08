import axios from "axios";
import { configDotenv } from "dotenv";
configDotenv()
const { PORT } = process.env;
const URL = `http://localhost:${PORT}`
export interface Company {
  id: number;
  mail: string;
  cnpj: string;
  subscribed: number,
  mails_sent: number,
  corporate_name: string;
  main_activity: string;
  legal_form: string;
  phone: string;
  registered_capital: string;
}
export async function fetchCompanies(): Promise<Company[] | null> {
  try {
    const response = await axios({
      method: 'GET',
      url: `${URL}/sent`,
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return null
  }
};
export async function editMailSent(data: Company) {
  try {
    const response = await axios({
      method: 'PATCH',
      url: `${URL}/sent/${data.id}`,
      data: data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
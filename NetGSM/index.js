const axios = require('axios');
const qs = require(`querystring`);

class SMS {
    static service_url = 'https://api.netgsm.com.tr/sms/send/get/';
    static config = null;
    static configure = ({ sender: msgheader, usercode, password, dev = false }) => {
        this.config = { msgheader, usercode, password };
    }
    static send = async (number, message) => {
        if (!SMS.config)
            return { success: false, error: `SMS not configured` };
        
        if (SMS.config.dev) {
            console.log(`Sending '${message}' to ${number}`);
            return { success: true, error: null };
        }

        const params = {
            ...SMS.config,
            gsmno: number,
            message
        }
        
        return await SMS.try_send_message(params);
    }
    static try_send_message = async (params) => {
        try {
            let URL = `${SMS.service_url}?${qs.stringify(params)}`;
            const extra = await axios.get(URL);
            if (typeof extra.data != `string`)
                return { succes: false, error: `Unknown`, extra };
            if (extra.data.split(` `)[0] != `00`)
                return { succes: false, error: extra.data, extra };
            return { succes: true, error: null };
        } catch (error) {
            return { success: false, error };
        }
    }
}
module.exports = SMS;
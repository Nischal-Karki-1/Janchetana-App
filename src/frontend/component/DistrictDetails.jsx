import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";

import nepalicongress from "../assets/Party Card/NC.png";
import uml from "../assets/Party Card/UML.png";
import maoist from "../assets/Party Card/Maoist.png";
import rsp from "../assets/Party Card/RSP.png";
import rpp from "../assets/Party Card/RPP.png";
import psp from "../assets/Party Card/PSP.png";
import psop from "../assets/Party Card/PSoP.png";
import jp from "../assets/Party Card/JP.png";
import nwpp from "../assets/Party Card/NWPP.png"
import independent from "../assets/Party Card/INDEPENDENT.png"

const borderline = require('../assets/borderline.png')

const DistrictDetails = ({ route }) => {
    const { district } = route.params;
    const { name, province, candidates } = district;

    const provinceMap = {
        "Koshi": "कोशी",
        "Madhesh": "मधेश",
        "Bagmati": "बागमती",
        "Gandaki": "गण्डकी",
        "Lumbini": "लुम्बिनी",
        "Karnali": "कर्णाली",
        "Sudurpashchim": "सुदूरपश्चिम"
    };

    const getNepaliProvince = (englishProvince) => {
        return provinceMap[englishProvince] || englishProvince;
    };

    const districtMap = {
        "ACHHAM": "अछाम",
        "ARGHAKHANCHI": "अर्घाखाँची",
        "BAGLUNG": "बागलुङ",
        "BAITADI": "बैतडी",
        "BAJHANG": "बझाङ",
        "BAJURA": "बाजुरा",
        "BANKE": "बाँके",
        "BARA": "बारा",
        "BARDIYA": "बर्दिया",
        "BHAKTAPUR": "भक्तपुर",
        "BHOJPUR": "भोजपुर",
        "CHITWAN": "चितवन",
        "DADELDHURA": "डडेलधुरा",
        "DAILEKH": "दैलेख",
        "DANG": "दाङ",
        "DARCHULA": "दार्चुला",
        "DHADING": "धादिङ",
        "DHANKUTA": "धनकुटा",
        "DHANUSHA": "धनुषा",
        "DOLAKHA": "दोलखा",
        "DOLPA": "डोल्पा",
        "DOTI": "डोटी",
        "EASTERN RUKUM": "पूर्वी रुकुम",
        "GORKHA": "गोरखा",
        "GULMI": "गुल्मी",
        "HUMLA": "हुम्ला",
        "ILAM": "इलाम",
        "JAJARKOT": "जाजरकोट",
        "JHAPA": "झापा",
        "JUMLA": "जुम्ला",
        "KAILALI": "कैलाली",
        "KALIKOT": "कालिकोट",
        "KANCHANPUR": "कञ्चनपुर",
        "KAPILVASTU": "कपिलवस्तु",
        "KASKI": "कास्की",
        "KATHMANDU": "काठमाडौँ",
        "KAVREPALANCHOK": "काभ्रेपलाञ्चोक",
        "KHOTANG": "खोटाङ",
        "LALITPUR": "ललितपुर",
        "LAMJUNG": "लमजुङ",
        "MAHOTTARI": "महोत्तरी",
        "MAKWANPUR": "मकवानपुर",
        "MANANG": "मनाङ",
        "MORANG": "मोरङ",
        "MUGU": "मुगु",
        "MUSTANG": "मुस्ताङ",
        "MYAGDI": "म्याग्दी",
        "NAWALPUR": "नवलपुर",
        "NUWAKOT": "नुवाकोट",
        "OKHALDHUNGA": "ओखलढुंगा",
        "PALPA": "पाल्पा",
        "PANCHTHAR": "पाँचथर",
        "PARASI": "पारासी",
        "PARBAT": "पर्वत",
        "PARSA": "पर्सा",
        "PYUTHAN": "प्युठान",
        "RAMECHHAP": "रामेछाप",
        "RASUWA": "रसुवा",
        "RAUTAHAT": "रौतहट",
        "ROLPA": "रोल्पा",
        "RUPANDEHI": "रुपन्देही",
        "SALYAN": "सल्यान",
        "SANKHUWASABHA": "सङ्खुवासभा",
        "SAPTARI": "सप्तरी",
        "SARLAHI": "सर्लाही",
        "SINDHULI": "सिन्धुली",
        "SINDHUPALCHOK": "सिन्धुपाल्चोक",
        "SIRAHA": "सिराहा",
        "SOLUKHUMBU": "सोलुखुम्बु",
        "SUNSARI": "सुनसरी",
        "SURKHET": "सुर्खेत",
        "SYANGJA": "स्याङ्जा",
        "TANAHUN": "तनहुँ",
        "TAPLEJUNG": "ताप्लेजुङ",
        "TERHATHUM": "तेह्रथुम",
        "UDAYAPUR": "उदयपुर",
        "WESTERN RUKUM": "पश्चिम रुकुम"
    };


    const getNepaliDistrict = (englishDistrict) => {
        return districtMap[englishDistrict] || englishDistrict;
    };

    const getPartyImage = (partyName) => {
        switch (partyName) {
            case "नेपाली काङ्ग्रेस":
                return nepalicongress;
            case "नेकपा एमाले":
                return uml;
            case "नेपाल कमयुनिस्ट पार्टी":
                return maoist;
            case "राष्ट्रिय स्वतन्त्र पार्टी":
                return rsp;
            case "राष्ट्रिय प्रजातन्त्र पार्टी":
                return rpp;
            case "जनता समाजवादी":
                return psp;
            case "जनता समाजवादी पार्टी":
                return psop;
            case "जनमत पार्टी":
                return jp;
            case "नेपाल मजदुर किसान पार्टी":
                return nwpp;
            default:
                return independent;
        }
    };
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.provincetext}> प्रदेश: </Text>
                    <Text style={styles.provincedetail}>{getNepaliProvince(province)}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.districttext}>जिल्ला: </Text>
                    <Text style={styles.districtdetail}>{getNepaliDistrict(name)}</Text>
                </View>


                <Text style={styles.title}>नगरपालिका वा गाउँपालिका उम्मेदवारहरू</Text>
                <Image style={styles.borderline} source={borderline} />
                {candidates?.map((candidate, index) => (

                    <View key={index} style={styles.candidateContainer}>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={candidate.candidateimg} style={styles.candidateImage} />
                            <Image source={getPartyImage(candidate.party)} style={styles.partyImage} />
                            <View style={styles.overlayTextContainer}>
                                <View style={styles.overlayTextRow}>
                                    <Text style={styles.boxtitle}>नाम: </Text>
                                    <Text style={styles.boxtext}>{candidate.name}</Text>
                                </View>
                                <View style={styles.overlayTextRow}>
                                    <Text style={styles.boxtitle}>पार्टी: </Text>
                                    <Text style={styles.boxtext}>{candidate.party}</Text>
                                </View>
                                <View style={styles.overlayTextRow}>
                                    <Text style={styles.boxtitle}>न.पा/गा.पा: </Text>
                                    <Text style={styles.boxtext}>{candidate.localgovernment}</Text>
                                </View>
                            </View>
                        </View>


                        <Text style={styles.title}>उम्मेदवारका प्रतिबद्धताहरू</Text>
                        <Image style={{ width: 280, marginTop: 10, alignSelf: 'center' }} source={borderline} />
                        <ScrollView vertical contentContainerStyle={styles.manifestoScrollView}>
                            {Object.keys(candidate.manifesto).filter(key => key.startsWith("imageurl")).map((imageKey, idx) => {
                                const titleKey = `title${imageKey.slice(-1)}`;
                                const imageSource = candidate.manifesto[imageKey];

                                const title = candidate.manifesto[titleKey];

                                return (
                                    <View key={idx}>
                                        <Image source={imageSource} style={styles.manifestoImage} />
                                        <Text style={styles.manifestoTitle}>{title}</Text>

                                    </View>
                                );
                            })}
                        </ScrollView>

                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default DistrictDetails;

const styles = StyleSheet.create({
    container: {
        alignSelf: 'center',
        padding: 10,
    },
    card: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        maxWidth: 400,
        alignItems: 'center',
    },
    title: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 5,
        color: '#333',


    },
    provincetext: {
        fontSize: 28,
        marginTop: 10,
        marginBottom: 10,
        color: '#333',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    provincedetail: {
        fontSize: 28,
        marginVertical: 10,
        color: '#333',

    },
    districttext: {
        fontSize: 24,
        marginTop: 5,
        marginBottom: 10,
        color: '#333',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    districtdetail: {
        fontSize: 24,
        marginVertical: 5,
        color: '#333',
    },
    borderline: {
        marginTop: 10
    },
    boxtitle: {

        fontSize: 16,
        fontWeight: 'bold'
    },
    boxtext: {

        fontSize: 16,
    },
    imageContainer: {
        position: 'relative',
    },
    overlayTextContainer: {
        position: 'absolute',
        top: 0,
        left: 110,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    overlayTextRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    candidateContainer: {
        marginTop: 20,

        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 20,
        width: '100%',
    },
    candidateName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    partyName: {
        fontWeight: 'bold',
        fontStyle: 'italic',
        color: '#333',
    },
    candidateImage: {
        width: 100,
        height: 100,
        borderRadius: 100,
    


    },
    partyImage: {
        width: 230,
        height: 100,
        marginLeft: -20

    },
    manifestoTitle: {
        marginTop: 10,
        fontSize: 14,
        fontWeight: 'black',
        color: '#333',
        textAlign: 'center',
    },
    manifestoScrollView: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    manifestoImage: {
        width: 280,
        height: 280,
        marginHorizontal: 5,
        marginTop: 20,
        borderRadius: 20
    },
});
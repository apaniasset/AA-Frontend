import React, { useEffect, useState } from "react";
import { Image, View, StatusBar } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { RootStackParamList } from "../../Navigations/RootStackParamList";
import { COLORS } from "../../constants/theme";
import { IMAGES } from "../../constants/Images";
import * as Progress from "react-native-progress";
import { RootState } from "../../redux/reducer";

type SplashScreenProps = StackScreenProps<RootStackParamList, 'splash'>;

const Splash = ({ navigation }: SplashScreenProps) => {

    const isLoggedIn = useSelector((state: RootState) => state.user?.login === true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 1) {
                    clearInterval(interval);
                    if (isLoggedIn) {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: "DrawerNavigation" }],
                        });
                    } else {
                        navigation.replace("Onbording");
                    }
                    return 1;
                }
                return prev + 0.02;
            });
        }, 100);

        return () => clearInterval(interval);
    }, [isLoggedIn]);

    return (
        <View
            style={{
                backgroundColor: COLORS.primary,
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
            <Image
                resizeMode="contain"
                style={{ width: 200, height: 120 }}
                source={IMAGES.logo}
            />

            <View style={{ marginTop: 16 }}>
                <Progress.Bar
                    progress={progress}
                    width={100}
                    color="#FFFFFF"
                    unfilledColor="rgba(255,255,255,0.35)"
                    borderWidth={0}
                    height={6}
                    borderRadius={10}
                    animated={true}
                />
            </View>
        </View>
    );
};

export default Splash;

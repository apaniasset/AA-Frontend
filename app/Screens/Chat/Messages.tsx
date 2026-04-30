import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useTheme } from '@react-navigation/native'
import Header from '../../layout/Header';
import { GlobalStyleSheet } from '../../constants/StyleSheet';
import { COLORS, FONTS } from '../../constants/theme';
import { flashError, flashSuccess } from '../../utils/flash';
import { getMasterLeadsList, MasterLead, unlockMasterLead } from '../../services/leads';

// TODO: Replace with GET /api/merchant/me response.
const dummyMerchantSummary = {
    available_properties: 1,
    available_leads: 1,
};

const dummyLeads = [
    { id: 1, name: 'J******', phone: '98******', date: '02 Mar 2026, 09:46 AM' },
    { id: 2, name: 'G******', phone: '91******', date: '21 Feb 2026, 02:25 PM' },
];

type UiLead = {
    id: number;
    name: string;
    phone: string;
    date: string;
    unlocked?: boolean;
};

const Messages = () => {

    const theme = useTheme();
    const { colors } : {colors : any } = theme;
    const [leads, setLeads] = useState<UiLead[]>([]);
    const [loading, setLoading] = useState(false);
    const [unlockingId, setUnlockingId] = useState<number | null>(null);

    const hasPropertyCredits = dummyMerchantSummary.available_properties > 0;
    const availableLeads = useMemo(() => leads.length || dummyMerchantSummary.available_leads, [leads.length]);
    const canUseLeads = hasPropertyCredits && availableLeads > 0;
    const styles = createStyles(colors, theme.dark);

    const formatDate = (value?: string) => {
        if (!value) return 'NA';
        const d = new Date(value);
        if (Number.isNaN(d.getTime())) return value;
        return d.toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        });
    };

    const maskPhone = (value?: string) => {
        if (!value) return 'NA';
        if (value.length <= 4) return value;
        return `${value.slice(0, 2)}${'*'.repeat(Math.max(0, value.length - 4))}${value.slice(-2)}`;
    };

    const normalizeLead = (item: MasterLead, index: number): UiLead => {
        const id = Number(item.id ?? index + 1);
        const maybeName = item.name ?? (item.full_name as string) ?? (item.customer_name as string);
        const maybePhone = item.phone ?? (item.mobile as string) ?? (item.contact as string);
        return {
            id,
            name: maybeName ? String(maybeName) : `Lead #${id}`,
            phone: maskPhone(maybePhone ? String(maybePhone) : ''),
            date: formatDate((item.created_at as string) || (item.date as string)),
            unlocked: false,
        };
    };

    const fetchLeads = useCallback(async () => {
        try {
            setLoading(true);
            const response = await getMasterLeadsList({});
            if (!response.success) {
                throw new Error(response.message || 'Failed to load leads');
            }
            const payload = response.data;
            const rawList =
                (payload?.leads as MasterLead[]) ||
                (payload?.list as MasterLead[]) ||
                (payload?.data as MasterLead[]) ||
                [];
            if (Array.isArray(rawList) && rawList.length > 0) {
                setLeads(rawList.map(normalizeLead));
            } else {
                setLeads(dummyLeads.map((item) => ({ ...item, unlocked: false })));
            }
        } catch (error: any) {
            setLeads(dummyLeads.map((item) => ({ ...item, unlocked: false })));
            flashError({
                title: 'Lead list failed',
                body: error?.message || 'Unable to fetch master leads',
            });
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchLeads();
    }, [fetchLeads]);

    const onViewLead = async (lead: UiLead) => {
        try {
            setUnlockingId(lead.id);
            const response = await unlockMasterLead(lead.id);
            if (!response.success) {
                throw new Error(response.message || 'Unlock failed');
            }

            const unlockedPhone = response.data?.phone || response.data?.lead?.phone;
            setLeads((prev) =>
                prev.map((item) =>
                    item.id === lead.id
                        ? { ...item, unlocked: true, phone: unlockedPhone ? String(unlockedPhone) : item.phone }
                        : item
                )
            );
            flashSuccess({ title: 'Lead unlocked', body: 'Lead contact is now visible.' });
        } catch (error: any) {
            flashError({
                title: 'Unlock failed',
                body: error?.message || 'Unable to unlock this lead',
            });
        } finally {
            setUnlockingId(null);
        }
    };

    return (
        <View style={styles.screen}>
            <Header
                title={"Leads"}
                leftIcon={'back'}
                titleLeft
            />
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <View style={[GlobalStyleSheet.container,{paddingHorizontal:20}]}>                    
                    <View style={styles.summaryCard}>
                        <Text style={[FONTS.h6,FONTS.fontSemiBold,{color:colors.gray100}]}>Credits Overview</Text>
                        <View style={styles.statsRow}>
                            <View style={styles.statItem}>
                                <Text style={[FONTS.BodyXS, { color: colors.gray60 }]}>Properties</Text>
                                <Text style={[FONTS.h5, FONTS.fontBold, { color: colors.gray100 }]}>
                                    {dummyMerchantSummary.available_properties}
                                </Text>
                            </View>
                            <View style={styles.statDivider} />
                            <View style={styles.statItem}>
                                <Text style={[FONTS.BodyXS, { color: colors.gray60 }]}>Leads</Text>
                                <Text style={[FONTS.h5, FONTS.fontBold, { color: colors.gray100 }]}>
                                    {availableLeads}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.statusPill}>
                            <Text style={[FONTS.BodyXS, FONTS.fontMedium, { color: canUseLeads ? '#179D67' : '#FC3752' }]}>
                                {canUseLeads ? 'Leads enabled' : 'Leads disabled'}
                            </Text>
                        </View>
                    </View>

                    {!hasPropertyCredits && (
                        <View style={styles.warningCard}>
                            <Text style={[FONTS.BodyM,FONTS.fontSemiBold,{color:'#FC3752'}]}>
                                Leads are unavailable
                            </Text>
                            <Text style={[FONTS.BodyS,{color:colors.gray60,marginTop:6}]}>
                                Add property credits to enable leads.
                            </Text>
                        </View>
                    )}

                    {canUseLeads && (
                        <View style={styles.sectionHeader}>
                            <Text style={[FONTS.h6, FONTS.fontSemiBold, { color: colors.gray100 }]}>Latest Leads</Text>
                            <Text style={[FONTS.BodyXS, FONTS.fontMedium, { color: colors.gray60 }]}>
                                {loading ? 'Loading...' : `${leads.length} records`}
                            </Text>
                        </View>
                    )}

                    {loading && (
                        <View style={styles.loaderWrap}>
                            <ActivityIndicator size="small" color={COLORS.primary} />
                        </View>
                    )}

                    {canUseLeads && !loading && leads.map((item) => (
                        <View key={item.id} style={styles.leadCard}>
                            <View style={[GlobalStyleSheet.flexcenter,{justifyContent:'space-between', alignItems: 'center'}]}>
                                <View style={{ flex: 1, paddingRight: 8 }}>
                                    <Text style={[FONTS.BodyS,FONTS.fontSemiBold,{color:colors.gray90}]}>
                                        {item.name}
                                    </Text>
                                    <Text style={[FONTS.BodyXS,{color:colors.gray60, marginTop: 3}]}>
                                        {item.date}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    activeOpacity={0.85}
                                    style={styles.viewButton}
                                    disabled={unlockingId === item.id || item.unlocked}
                                    onPress={() => onViewLead(item)}
                                >
                                    <Text style={[FONTS.BodyXS, FONTS.fontSemiBold, { color: COLORS.primary }]}>
                                        {item.unlocked ? 'Viewed' : unlockingId === item.id ? '...' : 'View'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.phoneChip}>
                                <Text style={[FONTS.BodyXS, FONTS.fontMedium, { color: COLORS.primary }]}>Phone: {item.phone}</Text>
                            </View>
                        </View>
                    ))}

                    {hasPropertyCredits && !canUseLeads && (
                        <View style={styles.warningCard}>
                            <Text style={[FONTS.BodyM,FONTS.fontSemiBold,{color:colors.gray90}]}>
                                No leads available right now
                            </Text>
                            <Text style={[FONTS.BodyS,{color:colors.gray60,marginTop:6}]}>
                                You can check back later for new leads.
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    )
}

export default Messages

const createStyles = (colors: any, isDark: boolean) =>
    StyleSheet.create({
        screen: {
            backgroundColor: colors.card,
            flex: 1,
        },
        scrollContent: {
            flexGrow: 1,
            paddingBottom: 20,
        },
        summaryCard: {
            padding: 14,
            backgroundColor: isDark ? COLORS.darkwhite : COLORS.white,
            borderRadius: 14,
            borderLeftWidth: 2,
            borderLeftColor: COLORS.primary,
            elevation: 4,
            shadowColor: 'rgba(0,0,0,0.4)',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 24,
            marginBottom: 12,
        },
        statsRow: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: colors.gray20,
            borderRadius: 12,
            marginTop: 12,
            paddingVertical: 12,
            paddingHorizontal: 8,
        },
        statItem: {
            flex: 1,
            alignItems: 'center',
        },
        statDivider: {
            width: 1,
            height: 28,
            backgroundColor: colors.gray20,
        },
        statusPill: {
            alignSelf: 'flex-start',
            marginTop: 10,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 100,
            backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : '#F4F8FF',
        },
        warningCard: {
            padding: 14,
            backgroundColor: isDark ? COLORS.darkwhite : COLORS.white,
            borderRadius: 12,
            borderLeftWidth: 2,
            borderLeftColor: COLORS.primary,
            borderWidth: 1,
            borderColor: colors.gray20,
            marginBottom: 12,
        },
        sectionHeader: {
            marginTop: 4,
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        leadCard: {
            padding: 12,
            backgroundColor: isDark ? COLORS.darkwhite : COLORS.white,
            borderRadius: 12,
            borderLeftWidth: 2,
            borderLeftColor: COLORS.primary,
            elevation: 4,
            shadowColor: 'rgba(0,0,0,0.4)',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.1,
            shadowRadius: 24,
            marginBottom: 10,
        },
        phoneChip: {
            marginTop: 8,
            alignSelf: 'flex-start',
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderRadius: 8,
            backgroundColor: isDark ? 'rgba(123,70,229,0.20)' : '#F2EDFF',
        },
        viewButton: {
            borderWidth: 1,
            borderColor: COLORS.primary,
            backgroundColor: isDark ? 'rgba(123,70,229,0.12)' : '#F6F2FF',
            paddingHorizontal: 14,
            paddingVertical: 6,
            borderRadius: 8,
        },
        loaderWrap: {
            marginTop: 8,
            marginBottom: 12,
            alignItems: 'center',
        },
    });
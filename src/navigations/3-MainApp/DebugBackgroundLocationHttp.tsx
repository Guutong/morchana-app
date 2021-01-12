import React, { useEffect, useState } from 'react'
import { StatusBar, StyleSheet, Text, ScrollView, View } from 'react-native'
import { COLORS, FONT_SIZES } from '../../styles'
import { MyBackground } from '../../components/MyBackground'
import { SafeAreaView } from 'react-native-safe-area-context'
import { PrimaryButton } from '../../components/Button'
import { useNavigation } from 'react-navigation-hooks'
import { normalize } from 'react-native-elements'
import I18n from '../../../i18n/i18n'
import AsyncStorage from '@react-native-community/async-storage'

export const DebugBackgroundLocationHttp = () => {
  const navigation = useNavigation()
  const [logs, setLogs] = useState<any[]>([])

  useEffect(() => {
    let interval = setInterval(() => {
      AsyncStorage.getItem('locationHttp').then((log) => setLogs(JSON.parse(log || '[]')))
    }, 1000)
    return () => clearInterval(interval)
  })

  return (
    <MyBackground variant="light">
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.PRIMARY_LIGHT}
      />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          {(logs || []).map((log: any) => <Text key={log.timestamp} style={{ fontSize: FONT_SIZES[200] * 0.75 }}>{log}</Text>)}
        </ScrollView>
        <View
          style={{
            alignItems: 'center',
            paddingHorizontal: normalize(16),
            marginBottom: 16,
          }}
        >
          <PrimaryButton
            title={'Clear'}
            style={{ width: '100%', marginBottom: 5 }}
            containerStyle={{ width: '100%' }}
            onPress={async() => {
              await AsyncStorage.removeItem('locationHttp')
            }}
          />
          <PrimaryButton
            title={I18n.t('close')}
            style={{ width: '100%' }}
            containerStyle={{ width: '100%' }}
            onPress={() => {
              navigation.pop()
            }}
          />
        </View>
      </SafeAreaView>
    </MyBackground>
  )
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  sectionHeader: {
    height: 56,
    justifyContent: 'flex-end',
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 8,
  },
  sectionHeaderText: {
    color: '#AAAAAA',
    fontSize: FONT_SIZES[400],
  },
  settingsSection: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  horizontalRow: {
    flexDirection: 'row',
  },
  leftArea: {
    flex: 1,
  },
  rightArea: {
    justifyContent: 'flex-start',
  },
  sectionText: {
    fontSize: FONT_SIZES[500],
    color: '#000000',
  },
  sectionDescription: {
    marginTop: 4,
    fontSize: FONT_SIZES[400],
    color: '#888888',
  },
  mediumText: {
    fontSize: FONT_SIZES[600],
    color: '#000000',
  },
  largeText: {
    fontSize: FONT_SIZES[700],
    color: '#000000',
  },
  sectionTitle: {
    fontSize: FONT_SIZES[700],
    fontWeight: '600',
    color: '#000000',
  },
  scrollView: {
    marginTop: 24,
    marginLeft: 24,
    marginRight: 24,
  },
})

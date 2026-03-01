import { useState, useEffect, useCallback } from 'react';
import { getStates, getCities, getAreas, StateItem, CityItem, AreaItem } from '../services/masterData';

export interface LocationValues {
  stateId: number | null;
  cityId: number | null;
  areaId: number | null;
  stateName: string | null;
  cityName: string | null;
  areaName: string | null;
}

export function useStateCityArea() {
  const [states, setStates] = useState<StateItem[]>([]);
  const [cities, setCities] = useState<CityItem[]>([]);
  const [areas, setAreas] = useState<AreaItem[]>([]);
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingAreas, setLoadingAreas] = useState(false);
  const [selectedStateId, setSelectedStateId] = useState<number | null>(null);
  const [selectedCityId, setSelectedCityId] = useState<number | null>(null);
  const [selectedAreaId, setSelectedAreaId] = useState<number | null>(null);
  const [selectedStateName, setSelectedStateName] = useState<string | null>(null);
  const [selectedCityName, setSelectedCityName] = useState<string | null>(null);
  const [selectedAreaName, setSelectedAreaName] = useState<string | null>(null);

  const toStateArray = (data: unknown): StateItem[] => {
    if (Array.isArray(data)) return data as StateItem[];
    if (data && typeof data === 'object' && Array.isArray((data as any).states)) return (data as any).states;
    return [];
  };
  const toCityArray = (data: unknown): CityItem[] => {
    if (Array.isArray(data)) return data as CityItem[];
    if (data && typeof data === 'object' && Array.isArray((data as any).cities)) return (data as any).cities;
    return [];
  };

  // Load states on mount
  useEffect(() => {
    let cancelled = false;
    setLoadingStates(true);
    getStates()
      .then((res) => {
        if (!cancelled && res.success) setStates(toStateArray(res.data));
      })
      .catch(() => {
        if (!cancelled) setStates([]);
      })
      .finally(() => setLoadingStates(false));
    return () => { cancelled = true; };
  }, []);

  // Load cities when a state is selected (same endpoint as Postman: /city/list, optional ?state_id=)
  useEffect(() => {
    if (selectedStateId == null) {
      setCities([]);
      return;
    }
    let cancelled = false;
    setLoadingCities(true);
    getCities(selectedStateId)
      .then((res) => {
        if (!cancelled && res.success) setCities(toCityArray(res.data));
        else if (!cancelled) setCities([]);
      })
      .catch(() => {
        if (!cancelled) setCities([]);
      })
      .finally(() => setLoadingCities(false));
    return () => { cancelled = true; };
  }, [selectedStateId]);

  // If backend returns all cities without state_id support, filter client-side
  const citiesForState = selectedStateId
    ? cities.filter((c) => c.state_id === selectedStateId)
    : cities;

  const toAreaArray = (data: unknown): AreaItem[] => {
    if (Array.isArray(data)) return data as AreaItem[];
    if (data && typeof data === 'object' && Array.isArray((data as any).areas)) return (data as any).areas;
    return [];
  };

  // Load areas when city is selected
  const loadAreas = useCallback((cityId: number) => {
    setLoadingAreas(true);
    getAreas(cityId)
      .then((res) => {
        if (res.success) setAreas(toAreaArray(res.data));
        else setAreas([]);
      })
      .catch(() => setAreas([]))
      .finally(() => setLoadingAreas(false));
  }, []);

  useEffect(() => {
    if (selectedCityId != null) {
      loadAreas(selectedCityId);
    } else {
      setAreas([]);
    }
  }, [selectedCityId, loadAreas]);

  const selectState = useCallback((id: number | null, name: string | null) => {
    setSelectedStateId(id);
    setSelectedStateName(name);
    setSelectedCityId(null);
    setSelectedCityName(null);
    setSelectedAreaId(null);
    setSelectedAreaName(null);
    setAreas([]);
  }, []);

  const selectCity = useCallback((id: number | null, name: string | null) => {
    setSelectedCityId(id);
    setSelectedCityName(name);
    setSelectedAreaId(null);
    setSelectedAreaName(null);
  }, []);

  const selectArea = useCallback((id: number | null, name: string | null) => {
    setSelectedAreaId(id);
    setSelectedAreaName(name);
  }, []);

  const values: LocationValues = {
    stateId: selectedStateId,
    cityId: selectedCityId,
    areaId: selectedAreaId,
    stateName: selectedStateName,
    cityName: selectedCityName,
    areaName: selectedAreaName,
  };

  return {
    states,
    cities: citiesForState,
    areas,
    loadingStates,
    loadingCities,
    loadingAreas,
    values,
    selectState,
    selectCity,
    selectArea,
  };
}

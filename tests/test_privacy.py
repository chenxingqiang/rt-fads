import pytest
from rt_fads.privacy.secure_computation import SecureComputation


def test_differential_privacy():
    secure_comp = SecureComputation(epsilon=0.1)

    # Test data privacy
    original_data = [1, 2, 3, 4, 5]
    noisy_data = secure_comp.dp.add_noise(original_data)

    assert len(noisy_data) == len(original_data)
    assert not all(x == y for x, y in zip(original_data, noisy_data))


def test_secure_feature_extraction():
    secure_comp = SecureComputation()

    # Test secure feature extraction
    test_data = {'feature1': [1, 2, 3], 'feature2': [4, 5, 6]}
    result = secure_comp.secure_feature_extraction(test_data)

    assert result is not None
